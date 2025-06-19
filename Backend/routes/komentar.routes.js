const express = require('express');
const router = express.Router();
const komentarController = require('../controllers/komentar.controller');

router.get('/:id', komentarController.getByBerita);
router.post('/', komentarController.create);

module.exports = router;