const express = require('express');
const router = express.Router();

const voiceCon = require('../controller/voice');

router.post('/', voiceCon.post);

module.exports = router;
