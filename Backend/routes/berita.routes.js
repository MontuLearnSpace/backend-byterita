// routes/berita.js

const express = require('express');
const router = express.Router();
const beritaController = require('../controllers/berita.controller');

// ⚠️ ROUTE KHUSUS (spesifik) harus di atas
router.get('/berita-utama', beritaController.getBeritaUtama);
router.get('/berita-populer', beritaController.getBeritaPopuler);
router.get('/search/:keyword', beritaController.search);

// ROUTE UTAMA (general)
router.get('/', beritaController.getAll);
router.get('/:id', beritaController.getById);
router.post('/', beritaController.create);
router.put('/:id', beritaController.update);
router.delete('/:id', beritaController.delete);

module.exports = router;
