const express = require('express');
const router = express.Router();
const userCon = require('../controllers/user');

// user Router

router.post('/signup', userCon.signup.post);
router.post('/login', userCon.login.post);
router.post('/signout', userCon.signout.post);
router.get('/voicelist', userCon.voicelist.get);
router.get('/', userCon.get);
router.put('/', userCon.put);

module.exports = router;
