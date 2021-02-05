const express = require('express');
const router = express.Router();

// controller생성 후 작성
// const { userController } = require('../controller/')

// signup
router.post('/signup');

// login
router.post('/login');

// signout
router.post('/signout');

// userinfo
router.get('/');

// voicelist
router.get('/voicelist');

module.exports = router;
