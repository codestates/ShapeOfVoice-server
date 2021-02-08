const { user, board, voice } = require('../models').models;
const user = require('../models').user;

module.exports = {
  signup: {
    post: (req, res) => {},
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
          const { id } = result.dataValues;
          req.session.userId = id;
          res.status(200).send({ id });
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
    get: async (req, res) => {
      // TODO: mypage에서 보여지는 정보를 찾아야 한다.(Thumbnail, Board Title, Board created At, nickname, e-mail)
      // TODO: user <-> voice <-> voice_board <-> board
      // TODO: ni,em    userId    voID, boId      id
      const { userId } = req.session; // 9

      // 유저의 Thumbnail, Board Title, Board created At, nickname, e-mail 찾기
      user
        .findOne({
          attributes: ['nickname', 'email'],
          where: { id: userId },
          include: [
            {
              model: voice,
              attributes: ['thumbnail'],
              include: [
                {
                  model: board,
                  attributes: ['title', 'createdAt'],
                  through: { attributes: [] },
                },
              ],
            },
          ],
        })
        .then((result) => {
          // const data = {};
          // data.nickname = result.nickname;
          // data.email = result.email;
          // data.thumbnail = result.voices.map((el) => el.thumbnail);
          // data.boards = result.voices.map((el) => el.boards).flat(2);
          res.status(200).send({ data: result });
        })
        .catch((err) => {
          res.send(err);
        });
    },
  },
  get: {},
};
