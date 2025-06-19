const pool = require('../config/db.config');

const Komentar = {
  async getByBerita(berita_id) {
    const res = await pool.query('SELECT * FROM komentar WHERE berita_id = $1', [berita_id]);
    return res.rows;
  },
  async create(data) {
    const res = await pool.query(
      'INSERT INTO komentar (user_id, berita_id, isi) VALUES ($1, $2, $3) RETURNING *',
      [data.user_id, data.berita_id, data.isi]
    );
    return res.rows[0];
  }
};

module.exports = Komentar;