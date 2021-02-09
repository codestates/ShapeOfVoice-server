const { user, board, voice, Sequelize } = require('../models').models;

module.exports = {
  signup: {
    post: (req, res) => {
      // TODO: client에서 넘어온 정보(email, password)를 가지고 DB에 저장한다.
      const { email, password, nickname, is_signed_up } = req.body;

      // 일반 회원가입 요청이 들어왔을 경우, is_signed_up = true
      // 확실하게 하기 위해 email, password를 넣어줌
      if (email && password && is_signed_up) {
        //* nickname conflict
        user.findOne({ where: { nickname } }).then((result) => {
          if (result !== null) {
            res.status(409).send({ message: 'generalUser nickname exists' });
          }
        });
        user.findOne({ where: { email } }).then((result) => {
          // conflict가 발생하지 않았을 경우
          if (result === null) {
            user
              .create({
                email,
                password,
                nickname,
                is_signed_up,
              })
              .then((generalUser) => {
                const {
                  id,
                  email,
                  nickname,
                  is_signed_up,
                } = generalUser.dataValues;
                req.session.userId = id;
                res.status(201).send({ id, email, nickname, is_signed_up });
              })
              .catch((err) => {
                res.send(err);
              });
          } else {
            res.status(409).send({ message: 'email exists' });
          }
        });
      } else {
        //* 비회원 요청, is_signed_up = false
        user.findOne({ where: { nickname } }).then((result) => {
          if (result === null) {
            user
              .create({
                nickname,
                is_signed_up,
              })
              .then((tempUser) => {
                const { id, nickname, is_signed_up } = tempUser.dataValues;
                req.session.userId = id;
                res.status(201).send({ id, nickname, is_signed_up });
              })
              .catch((err) => {
                res.send(err);
              });
          } else {
            res.status(409).send({ message: 'tempUser nickname exists' });
          }
        });
      }
    },
  },
  login: {
    post: (req, res) => {
      // TODO: 일반유저 로그인, email, password를 req.body로 받고 session.userId를 저장
      // TODO: 해당 유저의 id를 200응답코드와 함께 response 해준다.
      // TODO: 요청한 email, password가 맞지 않을 경우 404 응답코드와 함게 message: invalid user를 응답해준다.
      const { email, password } = req.body;
      user.findOne({ where: { email, password } }).then((result) => {
        if (result === null) {
          res.status(404).send({ message: 'invalid user' });
        } else {
          const { id, nickname } = result.dataValues;
          req.session.userId = id;
          res.status(200).send({ id, nickname });
        }
      });
    },
  },
  signout: {
    post: (req, res) => {
      // TODO: client에서 넘어온 sessionId를 가지고 DB에서 유저 검색
      // TODO: 찾은 user의 is_signed_up의 값이 true이면 일반 유저, false면 비회원 로그인
      // TODO: 일반 유저는 session만 삭제, 비회원 로그인은 DB에서 정보를 삭제후 session 삭제
      const { userId } = req.session;
      user.findOne({ where: { id: userId } }).then((result) => {
        const { id, is_signed_up } = result;
        // 일반 유저의 로그아웃 요청
        if (is_signed_up) {
          req.session.destroy();
          res.status(205).send({ message: 'logout success' });
        } else {
          // 비회원 유저의 로그아웃 요청
          //* session을 삭제한 후 DB에서 user의 정보 삭제
          req.session.destroy();
          user.destroy({ where: { id } }).then(() => {
            res.status(205).send({ message: 'tempUser logout success' });
          });
        }
      });
    },
  },
  voicelist: {
    get: (req, res) => {
      // TODO: mypage에서 보여지는 정보를 찾아야 한다.(Thumbnail, Board Title, Board created At, nickname, e-mail)
      // TODO: user <-> voice <-> voice_board <-> board
      // TODO: ni,em    userId    voID, boId      id
      const { userId } = req.session;

      // 유저의 Thumbnail, Board Title, Board created At, nickname, e-mail 찾기
      user
        .findAll({
          attributes: ['nickname', 'email'],
          where: { id: userId },
          include: [
            {
              model: voice,
              attributes: ['thumbnail'],
              include: [
                {
                  model: board,
                  attributes: ['id', 'title', 'createdAt'],
                  through: { attributes: [] },
                },
              ],
            },
          ],
        })
        .then((result) => {
          res.status(200).send({ result });
        })
        .catch((err) => {
          res.send(err);
        });
    },
  },
  get: (req, res) => {
    // TODO: client에서 렌더 되기 전에 호출을 당해 해당 유저의 정보를 넘겨준다.
    // TODO: 일반 유저, 비회원 유저 상관없이 session이 있을 경우 정보를 넘겨준다.
    // TODO: 해당 user의 sessionId가 있으면 로직 수행
    // TODO: id, nickname, email, is_signed_up 넘겨주기
    const { userId } = req.session;
    // session이 있을 경우
    if (userId) {
      user.findOne({ where: { id: userId } }).then((userInfo) => {
        const { id, nickname, email, is_signed_up } = userInfo.dataValues;
        res.status(200).send({ id, nickname, email, is_signed_up });
      });
    } else {
      // session이 없는 경우
      res.status(401).send({ message: 'unauthorized' });
    }
  },

  put: (req, res) => {
    user
      .findOne({
        where: { nickname: req.body.nickname },
      })
      .then((result) => {
        if (!result) {
          user
            .update(
              { nickname: req.body.nickname, updatedAt: Sequelize.DATE },
              { where: { id: req.session.userId } }
            )
            .then(() => res.send({ message: 'change success' }));
        } else {
          res.status(404).send();
        }
      })
      .catch((err) => res.send(err));
  },
};
