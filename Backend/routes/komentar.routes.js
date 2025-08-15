const express = require('express');
const router = express.Router();
const pool = require('../config/db.config');

// Tambah komentar
router.post('/', async (req, res) => {
  const { berita_id, nama, isi } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO komentar (berita_id, nama, isi) VALUES ($1, $2, $3) RETURNING *',
      [berita_id, nama, isi]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ambil komentar berdasarkan berita
router.get('/:berita_id', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM komentar WHERE berita_id = $1 ORDER BY tanggal DESC',
      [req.params.berita_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;