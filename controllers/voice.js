const { voice } = require('../models');

// voice controller
module.exports = {
  post: function (req, res) {
    voice
      .create({
        thumbnail: req.body.thumbnail,
        userId: req.session.userId,
      })
      .then((voice) => {
        res.send({ id: voice.id });
      });
  },
};
