const express = require('express');
const app = express();

const beritaRoutes = require('./routes/berita.routes');
const komentarRoutes = require('./routes/komentar.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middleware/errorHandler'); 

app.use(express.json());

app.use(beritaRoutes);
app.use(komentarRoutes);
app.use(authRoutes);

app.use(errorHandler);

module.exports = app;