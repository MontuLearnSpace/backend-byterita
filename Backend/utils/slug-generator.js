function generateSlug(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\\s+/g, '-')           // Ganti spasi dengan tanda -
    .replace(/[^\w\\-]+/g, '')       // Hapus karakter tidak valid
    .replace(/--+/g, '-')            // Ganti multiple dash jadi satu
    .replace(/^-+|-+$/g, '');        // Hapus dash di awal/akhir
}

module.exports = generateSlug;