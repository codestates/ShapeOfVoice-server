const express = require('express');
const router = express.Router();

// controller생성 후 작성
const voiceCon = require('../controllers/voice');

// voiceCreate
router.post('/', voiceCon.post);

module.exports = router;
