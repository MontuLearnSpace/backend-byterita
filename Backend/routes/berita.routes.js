const express = require('express');
const router = express.Router();
const beritaController = require('../controllers/berita.controller');

router.get('/', beritaController.getAll);
router.get('/:id', beritaController.getById);
router.post('/', beritaController.create);
router.delete('/:id', beritaController.delete);
router.get('/search/:keyword', beritaController.search);

module.exports = router;