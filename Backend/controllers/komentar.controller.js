const Komentar = require('../models/komentar.model');

exports.getByBerita = async (req, res) => {
  const komentar = await Komentar.getByBerita(req.params.id);
  res.json(komentar);
};

exports.create = async (req, res) => {
  const komentar = await Komentar.create(req.body);
  res.status(201).json(komentar);
};
