const boardCon = require("../controllers/board")
const express = require('express');
const router = express.Router();


router.post('/', boardCon.post);
router.patch('/', boardCon.patch);
router.delete('/', boardCon.delete);
router.get('/list', boardCon.list.get);
router.get('/detail', boardCon.detail.get);