const express = require('express');
const router = express.Router();
const { getAllBerita, getBeritaById, createBerita } = require('../controllers/berita.controller');

router.get('/api/berita', getAllBerita);
router.get('/api/berita/:id', getBeritaById);
router.post('/api/berita', createBerita);

module.exports = router;