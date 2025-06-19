const db = require('./db');

db.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Gagal konek ke database:', err);
  } else {
    console.log('✅ Tersambung ke database! Time:', res.rows[0].now);
  }
  process.exit();
});