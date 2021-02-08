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
    get: async (req, res) => {},
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
};
