const express = require('express');
const router = express.Router();

// controller생성 후 작성
const userCon = require('../controllers/user');

// signup
router.post('/signup', userCon.signup.post);

// login
router.post('/login', userCon.login.post);

// signout
router.post('/signout', userCon.signout.post);

// voicelist
router.get('/voicelist', userCon.voicelist.get);

// userinfo
// router.get('/', userCon.get);

module.exports = router;
