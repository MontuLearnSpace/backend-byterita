const UserDetail = require('../models/user_detail.model');

exports.getByUserId = async (req, res) => {
  const detail = await UserDetail.getByUserId(req.params.id);
  if (!detail) return res.status(404).json({ message: 'User detail tidak ditemukan' });
  res.json(detail);
};

exports.updateFotoProfil = async (req, res) => {
  const data = {
    user_id: req.body.user_id,
    foto_profil: req.body.foto_profil  // URL dari hasil upload
  };
  const result = await UserDetail.createOrUpdate(data);
  res.json(result);
};