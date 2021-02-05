var Voice = require('../models').voice;

module.exports = {
    post : function (req,res) {
        Voice.create({
            thumbnail: req.body.thumbnail,
            records: req.body.records,
            userId: req.session.userId
        })
        .then(voice => {
            res.send({id: voice.id})
        })
    }
}