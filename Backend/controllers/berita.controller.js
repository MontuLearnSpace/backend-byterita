const Berita = require('../models/berita.model');
const generateSlug = require('../utils/slug-generator');

exports.getAll = async (req, res) => {
  const berita = await Berita.getAll();
  res.json(berita);
};

exports.getById = async (req, res) => {
  const berita = await Berita.getById(req.params.id);
  if (!berita) return res.status(404).json({ message: 'Berita tidak ditemukan' });
  res.json(berita);
};

exports.create = async (req, res) => {
  const { user_id, penulis, judul, isi } = req.body;
  const slug = generateSlug(judul);
  const berita = await Berita.create({ user_id, penulis, judul, isi, slug });
  res.status(201).json(berita);
};

exports.delete = async (req, res) => {
  const deleted = await Berita.delete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Gagal menghapus berita' });
  res.json({ message: 'Berita dihapus' });
};

exports.search = async (req, res) => {
  const keyword = `%${req.params.keyword.toLowerCase()}%`;
  const result = await pool.query('SELECT * FROM berita WHERE LOWER(judul) LIKE $1 OR LOWER(isi) LIKE $1', [keyword]);
  res.json(result.rows);
};