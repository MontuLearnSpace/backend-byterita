const pool = require('../config/db.config');

const User = {
  async getAll() {
    const res = await pool.query('SELECT * FROM users');
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query('SELECT * FROM users WHERE user_id = $1', [id]);
    return res.rows[0];
  },
  async create(data) {
    const res = await pool.query(
      'INSERT INTO users (username, role) VALUES ($1, $2) RETURNING *',
      [data.username, data.role]
    );
    return res.rows[0];
  }
};

module.exports = User;