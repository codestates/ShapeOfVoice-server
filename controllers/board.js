const { Sequelize } = require('../models');
const { board, user, voice, voice_board } = require ('../models')

module.exports = {
  post: function (req, res) {
    board.create({
      title: req.body.title,
      userId: req.body.userId
    }).then((board) => {
      console.log(board);
      console.log(board.id);
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
      board.update(
        { title, updatedAt: Sequelize.DATE },
        { where: { userId, id } }
      ).then(() => {
        res.send({ message: 'update success' });
      });
    }
  },


  delete: function (req, res) {
    board.findOnd({
      where : {id : req.body.id}
    }).then(board =>{
      if (board.userId !== req.session.userId){
        res.status(404).send({message: "invalid user"})
      }
    }).then(()=>{
      voice_board.findOne({
        where : {boardId : req.body.id}
      }).then(voice_board => {
        voice.destroy({where: {id : voice_board.voiceId}})
        board.destroy({where: {id: req.body.id}})
      }).then(()=>res.send())
      .catch(err => res.send(err))
    })
  },

  detail: {
    post: function (req, res) {
      console.log(req.body.id)
      board.findOne({
        attributes: ['title', 'like_count', 'createdAt'],
        where: {id: req.body.id},
        include: [
          {
            model: user,
            attributes: ['nickname']
          },
          {
            model: voice,
            attributes: ['records'],
            through: { attributes: [] }
          }
        ]
      })
      .then(result => {
        console.log(result)
        res.send({result: result})
      })
      .catch(err => res.send(err))
    },
  },

  list: {
    get: function (req, res) {
      // TODO: 게시판의 전체 목록을 보여준다.
      // user table = nickname, voice table = thumbnail, board table = title, createdAt
      // 게시판의 전체 목록을
      user.findAll({
        attributes: ['nickname'],
        include: [
          {
            model: voice,
            attributes: ['thumbnail'],
            include: {
              model: board,
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
