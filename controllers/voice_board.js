const { voice_board } = require('../models');

// voice_board controller

module.exports = {
  post: function (req, res) {
    voice_board
      .create({
        boardId: req.body.boardId,
        voiceId: req.body.voiceId,
      })
      .then((voice_board) => {
        res.status(200).send({ id: voice_board.id });
      });
  },
};
