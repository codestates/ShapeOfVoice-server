const boardCon = require('../controllers/board');
const express = require('express');
const router = express.Router();

router.post('/', boardCon.post)
router.patch('/', boardCon.patch)
router.delete('/', boardCon.delete)
router.get('/detail', boardCon.detail.post)
router.get('/list', boardCon.list.get)

module.exports = router;
