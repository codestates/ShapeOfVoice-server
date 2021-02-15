const express = require('express');
const router = express.Router();
const boardCon = require('../controllers/board');

router.post('/', boardCon.post);
router.put('/likeCount', boardCon.likeCount.put);
router.patch('/', boardCon.patch);
router.delete('/', boardCon.delete);
router.post('/detail', boardCon.detail.post);
router.get('/list', boardCon.list.get);

module.exports = router;
