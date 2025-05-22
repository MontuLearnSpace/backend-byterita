const { berita } = require('../data/dummy');

const getAllBerita = (req, res) => {
  res.json(berita);
};

const getBeritaById = (req, res) => {
  const id = parseInt(req.params.id);
  const item = berita.find(b => b.id === id);
  if (!item) return res.status(404).json({ message: 'Berita tidak ditemukan' });
  res.json(item);
};

const createBerita = (req, res) => {
  const { judul, isi } = req.body;
  if (!judul || !isi) return res.status(400).json({ message: 'Judul dan isi wajib diisi' });

  const newBerita = {
    id: berita.length + 1,
    judul,
    isi,
  };

  berita.push(newBerita);
  res.status(201).json(newBerita);
};

module.exports = { getAllBerita, getBeritaById, createBerita };