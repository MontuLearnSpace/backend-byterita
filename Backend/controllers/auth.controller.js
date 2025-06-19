const jwt = require('jsonwebtoken');

const login = (req, res) => {
  const { email, password } = req.body;

  // Hardcoded user untuk contoh
  const dummyUser = {
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    name: 'Admin'
  };

  if (email === dummyUser.email && password === dummyUser.password) {
    const token = jwt.sign(
      { email: dummyUser.email, role: dummyUser.role },
      'secret123', // Gantilah ini nanti dengan process.env.JWT_SECRET
      { expiresIn: '1h' }
    );
    return res.status(200).json({
      message: 'Login berhasil',
      token
    });
  }

  return res.status(401).json({
    message: 'Email atau password salah'
  });
};

module.exports = { login };
