const { voice_board, user, voice, board } = require('../models');

module.exports = {
  post: function (req, res) {
    user
      .findAll({
        attributes: ['nickname', 'email'],
        include: [
          {
            model: voice,
            required: false,
            attributes: ['thumbnail'],
            include: [
              {
                model: board,
                required: false,
                attributes: ['id', 'title', 'createdAt'],
                // through: { attributes: [] },
              },
            ],
          },
        ],
        raw: true,
      })
      .then((result) => {
        res.send(result);
      });
    // voice_board
    //   .create({
    //     boardId: req.body.boardId,
    //     voiceId: req.body.voiceId,
    //   })
    //   .then((voice_board) => {
    //     console.log(voice_board);
    //     res.send({ id: voice_board.id });
    //   });
  },
};
