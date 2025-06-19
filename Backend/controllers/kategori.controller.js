const Kategori = require('../models/kategori.model');

exports.getAll = async (req, res) => {
  const kategori = await Kategori.getAll();
  res.json(kategori);
};