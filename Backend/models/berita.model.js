const pool = require('../config/db.config');

const Berita = {
  async getAll() {
    const res = await pool.query('SELECT * FROM berita');
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query('SELECT * FROM berita WHERE id = $1', [id]);
    return res.rows[0];
  },
  async create(data) {
    const res = await pool.query(
      'INSERT INTO berita (user_id, penulis, judul, isi) VALUES ($1, $2, $3, $4) RETURNING *',
      [data.user_id, data.penulis, data.judul, data.isi]
    );
    return res.rows[0];
  },
  async delete(id) {
    const res = await pool.query('DELETE FROM berita WHERE id = $1', [id]);
    return res.rowCount > 0;
  }
};

module.exports = Berita;