const pool = require('../config/db.config');

const Kategori = {
  async getAll() {
    const res = await pool.query('SELECT * FROM kategori');
    return res.rows;
  }
};

module.exports = Kategori;