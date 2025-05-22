let berita = [
  { id: 1, judul: 'Berita Pertama', isi: 'Ini adalah isi dari berita pertama.' },
  { id: 2, judul: 'Berita Kedua', isi: 'Ini adalah isi dari berita kedua.' }
];

let komentar = [
  { id: 1, berita_id: 1, nama: 'User1', isi: 'Komentar pertama untuk berita 1' },
  { id: 2, berita_id: 1, nama: 'User2', isi: 'Komentar kedua untuk berita 1' }
];

module.exports = { berita, komentar };