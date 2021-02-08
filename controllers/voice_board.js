const { models } = require('../models');
const Voice_Board = models.voice_board;

module.exports = {
  post: function (req, res) {
    Voice_Board.create({
      boardId: req.body.boardId,
      voiceId: req.body.voiceId,
    }).then((voice_board) => {
      res.send({ id: voice_board.id });
    });
  },
};
