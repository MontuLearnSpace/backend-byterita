const express = require('express');
const router = express.Router();
const kategoriController = require('../controllers/kategori.controller');

router.get('/', kategoriController.getAll);

module.exports = router;