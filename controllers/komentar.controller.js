const { komentar } = require('../data/dummy');

const getKomentarByBeritaId = (req, res) => {
  const beritaId = parseInt(req.params.berita_id);
  const hasil = komentar.filter(k => k.berita_id === beritaId);

  if (hasil.length === 0) {
    return res.status(404).json({ message: 'Komentar tidak ditemukan untuk berita ini.' });
  }

  res.json(hasil);
};

const createKomentar = (req, res) => {
  const { berita_id, nama, isi } = req.body;

  if (!berita_id || !nama || !isi) {
    return res.status(400).json({ message: 'Semua field (berita_id, nama, isi) wajib diisi.' });
  }

  const newKomentar = {
    id: komentar.length + 1,
    berita_id: parseInt(berita_id),
    nama,
    isi
  };

  komentar.push(newKomentar);
  res.status(201).json(newKomentar);
};

module.exports = { getKomentarByBeritaId, createKomentar };