const Berita = require('../models/berita.model');
const generateSlug = require('../utils/slug-generator');

exports.getAll = async (req, res) => {
  try {
    const berita = await Berita.getAll();
    res.json(berita);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil daftar berita', error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const berita = await Berita.getById(req.params.id);
    if (!berita) return res.status(404).json({ message: 'Berita tidak ditemukan' });
    res.json(berita);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil detail berita', error: err.message });
  }
};

exports.getBeritaUtama = async (req, res) => {
  try {
    const berita = await Berita.findLatest();
    if (!berita) return res.status(404).json({ message: 'Tidak ada berita' });
    res.json(berita);
  } catch (err) {
    res.status(500).json({ message: 'Gagal ambil berita utama', error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { user_id, penulis, judul, isi, kategori, gambar } = req.body;
    const slug = generateSlug(judul);

    const tanggal = new Date(); // 🔥 Tanggal posting otomatis

    const berita = await Berita.create({
      user_id,
      penulis,
      judul,
      isi,
      slug,
      kategori,
      gambar,
      tanggal
    });

    res.status(201).json(berita);
  } catch (err) {
    res.status(500).json({ message: 'Gagal membuat berita', error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { judul, isi, kategori, gambar } = req.body;
    const updated = await Berita.update(id, { judul, isi, kategori, gambar });

    if (!updated) {
      return res.status(404).json({ message: 'Berita tidak ditemukan atau gagal diperbarui' });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Gagal memperbarui berita', error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Berita.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Gagal menghapus berita' });
    res.json({ message: 'Berita dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal menghapus berita', error: err.message });
  }
};

exports.getBeritaPopuler = async (req, res) => {
  try {
    const data = await Berita.getBeritaPopuler();
    console.log('🚀 Berita Populer:', data);
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil berita populer' });
  }
};

exports.search = async (req, res) => {
  try {
    const keyword = `%${req.params.keyword.toLowerCase()}%`;
    const result = await Berita.search(keyword);
    res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Gagal melakukan pencarian', error: err.message });
  }

};
