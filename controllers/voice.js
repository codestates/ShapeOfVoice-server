const { voice } = require('../models');

module.exports = {
  post: function (req, res) {
    voice
      .create({
        thumbnail: req.body.thumbnail,
        records: req.body.records,
        userId: req.session.userId,
      })
      .then((voice) => {
        res.send({ id: voice.id });
      });
  },
};
