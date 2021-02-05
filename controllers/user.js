const { user } = require('../models');

module.exports = {
  signup: {
    post: (req, res) => {
      // TODO: client에서 넘어온 정보(email, password)를 가지고 DB에 저장한다.
      const { email, password, nickname, is_signed_up } = req.body;

      // 일반 회원가입 요청이 들어왔을 경우, is_signed_up = true
      if (email && password && is_signed_up) {
        //* nickname conflict
        user.findOne({ where: { nickname } }).then((result) => {
          if (result !== null) {
            res.status(409).send({ message: 'generalUser nickname exists' });
          }
        });
        user.findOne({ where: { email } }).then((result) => {
          // conflict가 발생하지 않았을 경우
          if (result === null) {
            user
              .create({
                email,
                password,
                nickname,
                is_signed_up,
              })
              .then((generalUser) => {
                const {
                  id,
                  email,
                  nickname,
                  is_signed_up,
                } = generalUser.dataValues;
                req.session.userId = id;
                res.status(201).send([id, email, nickname, is_signed_up]);
              })
              .catch((err) => {
                res.send(err);
              });
          } else {
            res.status(409).send({ message: 'email exists' });
          }
        });
      } else {
        //* 비회원 요청, is_signed_up = false
        user.findOne({ where: { nickname } }).then((result) => {
          if (result === null) {
            user
              .create({
                nickname,
                is_signed_up,
              })
              .then((tempUser) => {
                const { id, nickname, is_signed_up } = tempUser.dataValues;
                req.session.userId = id;
                res.status(201).send([id, nickname, is_signed_up]);
              })
              .catch((err) => {
                res.send(err);
              });
          } else {
            res.status(409).send({ message: 'tempUser nickname exists' });
            console.log();
          }
        });
      }
    },
  },
  login: {
    post: (req, res) => {},
  },
  signout: {
    post: {},
  },
  voicelist: {
    get: {},
  },
  get: {},
};
