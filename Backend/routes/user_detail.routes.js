const express = require('express');
const router = express.Router();
const controller = require('../controllers/user_detail.controller');

router.get('/:id', controller.getByUserId);
router.post('/', controller.updateFotoProfil); // update atau insert foto

module.exports = router;