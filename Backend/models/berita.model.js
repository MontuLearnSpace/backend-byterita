const pool = require('../config/db.config');

const Berita = {
  async getBeritaPopuler() {
    const res = await pool.query(
        `SELECT * FROM berita ORDER BY views DESC LIMIT 4`
     );
     return res.rows;
  },
  
  async getAll() {
    const res = await pool.query('SELECT * FROM berita ORDER BY id DESC');
    return res.rows;
  },

  async getById(id) {
    const res = await pool.query('SELECT * FROM berita WHERE id = $1', [id]);
    return res.rows[0];
  },

  async create(data) {
    const res = await pool.query(
      `INSERT INTO berita (user_id, penulis, judul, isi, slug, kategori, gambar, tanggal)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        data.user_id,
        data.penulis,
        data.judul,
        data.isi,
        data.slug,
        data.kategori || 'Lainnya',
        data.gambar || '',
        data.tanggal || new Date() // Default tanggal jika tidak dikirim
      ]
    );
    return res.rows[0];
  },



  async update(id, data) {
    const res = await pool.query(
      `UPDATE berita
       SET judul = $1,
           isi = $2,
           kategori = $3,
           gambar = $4
       WHERE id = $5
       RETURNING *`,
      [
        data.judul,
        data.isi,
        data.kategori || 'Lainnya',
        data.gambar || '',
        id
      ]
    );
    return res.rows[0]; // null jika tidak ditemukan
  },

  async delete(id) {
    const res = await pool.query('DELETE FROM berita WHERE id = $1', [id]);
    return res.rowCount > 0;
  },

  async search(keyword) {
    const res = await pool.query(
      `SELECT * FROM berita
       WHERE LOWER(judul) LIKE $1 OR LOWER(isi) LIKE $1
       ORDER BY id DESC`,
      [keyword]
    );
    return res.rows;
  },

  async findLatest() {
    const res = await pool.query(
      `SELECT * FROM berita ORDER BY id DESC LIMIT 1`
    );
    return res.rows[0];
  }

  
};

module.exports = Berita;