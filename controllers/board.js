const { Sequelize } = require('../models');
const Board = require('../models').board;
const User = require('../models').user;
const Voice = require('../models').voice;

module.exports = {
  post: function (req, res) {
    Board.create({ title: req.body.title }).then((board) => {
      console.log(board);
      console.log(board.id);
      res.send({ id: board.id });
    });
  },

  patch: function (req, res) {
    // user가 board의 title을 바꾸려고 하여 요청을 보내는 경우
    // TODO: client로부터 title, boardId를 전달받아
    // TODO: user의 sessionId와 전달 받은 id를 비교해서 같으면 바꾸고 아니면 오류메시지
    const { userId } = req.session;

    const { id, title } = req.body;

    // title을 바꾸길 원하는 user의 sessionId 가 있으면 로직 수행
    if (userId) {
      // board table의 userId = sessionId, id = req.body.id(해당 게시물 번호)
      Board.update(
        { title, updatedAt: Sequelize.DATE },
        { where: { userId, id } }
      ).then(() => {
        res.send({ message: 'update success' });
      });
    }
  },

  delete: function (req, res) {},

  detail: {
    get: function (req, res) {},
  },

  list: {
    get: function (req, res) {
      // TODO: 게시판의 전체 목록을 보여준다.
      // user table = nickname, voice table = thumbnail, board table = title, createdAt
      // 게시판의 전체 목록을
      User.findAll({
        attributes: ['nickname'],
        include: [
          {
            model: Voice,
            attributes: ['thumbnail'],
            include: {
              model: Board,
              attributes: ['title', 'createdAt'],
              through: { attributes: [] },
            },
          },
        ],
      })
        .then((result) => {
          res.status(200).send(result);
        })
        .catch((err) => {
          res.send(err);
        });
    },
  },
};
