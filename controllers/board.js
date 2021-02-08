var Board = require('../models').board;
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

  patch: function (req, res) {},

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
