const express = require('express');
const router = express.Router();
const { getKomentarByBeritaId, createKomentar } = require('../controllers/komentar.controller');

router.get('/api/komentar/:berita_id', getKomentarByBeritaId);
router.post('/api/komentar', createKomentar);

module.exports = router;