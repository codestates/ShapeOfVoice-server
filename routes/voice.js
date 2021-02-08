const express = require('express');
const router = express.Router();

const voiceController = require('../controller/voice')
router.post('/', voiceCon.post);

module.exports = router;
