const { voice_board, user, voice, board } = require('../models');

module.exports = {
  post: function (req, res) {
    voice_board
      .create({
        boardId: req.body.boardId,
        voiceId: req.body.voiceId,
      })
      .then((voice_board) => {
        console.log(voice_board);
        res.send({ id: voice_board.id });
      });
  },
};
