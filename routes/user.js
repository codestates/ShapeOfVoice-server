const express = require('express');
const router = express.Router();

// controller생성 후 작성
const userCon = require('../controllers/user');

// signup
router.post('/signup', userCon.signup.post);

// login
// router.post('/login', userCon.login.post);

// signout
// router.post('/signout', usercon.signout.post);

// userinfo
// router.get('/', userCon.get);

// voicelist
// router.get('/voicelist', userCon.voicelist.get);

module.exports = router;
