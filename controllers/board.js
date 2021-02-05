var Board = require('../models').board;

module.exports = {
    post : function (req,res) {
        Board.create({ title: req.body.title })
        .then(board => {
            console.log(board)
            console.log(board.id)
            res.send({id: board.id})
        })
    },

    patch : function (req,res) {

    },

    delete : function (req,res) {

    },

    detail: {

        get: function (req,res) {

        }
    },

    list: {

        get: function (req,res) {

        }
    }
}