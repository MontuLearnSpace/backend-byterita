const pool = require('../config/db.config');

const UserDetail = {
  async getByUserId(user_id) {
    const res = await pool.query('SELECT * FROM user_detail WHERE user_id = $1', [user_id]);
    return res.rows[0];
  },

  async createOrUpdate(data) {
    const res = await pool.query(
      `INSERT INTO user_detail (user_id, foto_profil)
       VALUES ($1, $2)
       ON CONFLICT (user_id)
       DO UPDATE SET foto_profil = EXCLUDED.foto_profil
       RETURNING *`,
      [data.user_id, data.foto_profil]
    );
    return res.rows[0];
  }
};

module.exports = UserDetail;