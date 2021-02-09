const express = require('express');
const router = express.Router();

const voiceCon = require('../controllers/voice')
router.post('/', voiceCon.post);

module.exports = router;
