const { user, board, voice } = require('../models').models;

module.exports = {
  signup: {
    post: (req, res) => {},
  },
  login: {
    post: (req, res) => {},
  },
  signout: {
    post: (req, res) => {},
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
