const User = require('../models/user.model');

exports.getAll = async (req, res) => {
  const users = await User.getAll();
  res.json(users);
};

exports.getById = async (req, res) => {
  const user = await User.getById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User tidak ditemukan' });
  res.json(user);
};

exports.create = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
};