const express = require('express');
const cors = require('cors');
const path = require('path');

const beritaRoutes = require('./routes/berita.routes');
console.log('beritaRoutes:', typeof beritaRoutes);
const userRoutes = require('./routes/user.routes');
console.log('userRoutes:', typeof userRoutes);
const komentarRoutes = require('./routes/komentar.routes');
console.log('komentarRoutes:', typeof komentarRoutes);
const kategoriRoutes = require('./routes/kategori.routes');
console.log('komentarRoutes:', typeof komentarRoutes);
const authRoutes = require('./routes/auth.routes');
console.log('authRoutes:', typeof authRoutes);
const uploadRoutes = require('./routes/upload.routes');
console.log('uploadRoutes:', typeof uploadRoutes);
const userDetailRoutes = require('./routes/user_detail.routes');
console.log('userDetailRoutes:', typeof userDetailRoutes);

const errorHandler = require('./middleware/error.middleware'); // middleware error harus di akhir

const app = express();

// ==== MIDDLEWARE DASAR ====
app.use(cors());
app.use(express.json());

// ==== ROUTES ====
app.use('/api/berita', beritaRoutes);
app.use('/api/users', userRoutes);
app.use('/api/komentar', komentarRoutes);
app.use('/api/kategori', kategoriRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/user-detail', userDetailRoutes);

// ==== SERVE STATIC FILE (UPLOAD) ====
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==== ERROR HANDLER (HARUS PALING AKHIR) ====
console.log('typeof errorHandler:', typeof errorHandler);
app.use(errorHandler);

module.exports = app;
