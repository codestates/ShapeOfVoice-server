const express = require('express');
const router = express.Router();
const boardCon = require('../controllers/board');

router.post('/', boardCon.post);
router.put('/incrementLikeCount', boardCon.incrementLikeCount.put);
router.put('/decrementLikeCount', boardCon.decrementLikeCount.put);
router.patch('/', boardCon.patch);
router.delete('/', boardCon.delete);
router.post('/detail', boardCon.detail.post);
router.get('/list', boardCon.list.get);

module.exports = router;
