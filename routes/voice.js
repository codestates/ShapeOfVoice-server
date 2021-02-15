const express = require('express');
const router = express.Router();
const voiceCon = require('../controllers/voice');

// voice Router

router.post('/', voiceCon.post);

module.exports = router;
