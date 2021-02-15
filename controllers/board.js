const {
  board,
  user,
  voice,
  voice_board,
  user_board_like,
} = require('../models');

module.exports = {
  post: function (req, res) {
    board
      .create({
        title: req.body.title,
        userId: req.session.userId,
      })
      .then((board) => {
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
      board.update({ title }, { where: { userId, id } }).then(() => {
        res.send({ message: 'update success' });
      });
    }
  },

  likeCount: {
    put: async function (req, res) {
      const { id } = req.body;

      const [result, created] = await user_board_like.findOrCreate({
        where: { boardId: id, userId: req.session.userId },
        defaults: { boardId: id, userId: req.session.userId },
      });

      if (created) {
        board.findOne({ where: { id } }).then((result) => {
          const { like_count } = result.dataValues;
          result.increment('like_count', { by: 1 });
          res.status(201).send({
            data: { id: result.dataValues.id, like_count: like_count + 1 },
            message: 'Increase complete',
          });
        });
      } else {
        board.findOne({ where: { id } }).then((result) => {
          const { like_count } = result.dataValues;
          result.decrement('like_count', { by: 1 });

          user_board_like.destroy({
            where: { boardId: id, userId: req.session.userId },
          });

          res.status(201).send({
            data: { like_count: like_count - 1 },
          });
        });
      }
    },
  },

  delete: function (req, res) {
    board
      .findOne({
        where: { id: req.body.id },
      })
      .then((board) => {
        if (board.userId !== req.session.userId) {
          res.status(404).send({ message: 'invalid user' });
        }
      })
      .then(() => {
        voice_board
          .findOne({
            where: { boardId: req.body.id },
          })
          .then((voice_board) => {
            voice.destroy({ where: { id: voice_board.voiceId } });
            board.destroy({ where: { id: req.body.id } });
          })
          .then(() => res.send())
          .catch((err) => res.send(err));
      });
  },

  detail: {
    post: function (req, res) {
      board
        .findOne({
          attributes: ['title', 'like_count', 'createdAt'],
          where: { id: req.body.id },
          include: [
            {
              model: user,
              attributes: ['nickname'],
            },
            {
              model: voice,
              attributes: ['thumbnail'],
              through: { attributes: [] },
            },
          ],
        })
        .then((result) => {
          res.send({ result });
        })
        .catch((err) => res.send(err));
    },
  },

  list: {
    get: function (req, res) {
      // TODO: 게시판의 전체 목록을 보여준다.
      // user table = nickname, voice table = thumbnail, board table = title, createdAt
      // 게시판의 전체 목록을
      user
        .findAll({
          attributes: ['nickname'],
          include: [
            {
              model: voice,
              attributes: ['thumbnail'],
              include: {
                model: board,
                attributes: ['id', 'like_count', 'title', 'createdAt'],
                through: { attributes: [] },
              },
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
};
