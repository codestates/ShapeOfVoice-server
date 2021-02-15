const voice_boardCon = require('../controllers/voice_board');
const express = require('express');
const router = express.Router();

// voice_board Router

router.post('/', voice_boardCon.post);

module.exports = router;
