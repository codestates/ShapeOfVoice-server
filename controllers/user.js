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
