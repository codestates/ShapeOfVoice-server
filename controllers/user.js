const { user } = require('../models');

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
                res.status(201).send([id, email, nickname, is_signed_up]);
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
                res.status(201).send([id, nickname, is_signed_up]);
              })
              .catch((err) => {
                res.send(err);
              });
          } else {
            res.status(409).send({ message: 'tempUser nickname exists' });
            console.log();
          }
        });
      }
    },
  },
  login: {
    post: (req, res) => {
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
    get: {},
  },
  get: {},
};
