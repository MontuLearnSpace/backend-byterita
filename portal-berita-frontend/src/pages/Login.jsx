import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login berhasil!');
      navigate('/');
    } catch (err) {
      alert('Login gagal. Username atau password salah.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Kiri */}
      <div className="w-1/2 bg-gray-100 flex flex-col items-center justify-center px-12 relative">
        <div className="absolute top-10 left-10 flex items-center gap-4">
          <img src="/byterita-logo.png" alt="Logo" className="w-20" />
          <div>
            <h1 className="text-3xl font-bold text-cyan-500">Byterita</h1>
            <p className="text-sm text-gray-600">Akses Berita Terpercaya dan Terkini</p>
          </div>
        </div>
        <img src="/login-illustration.png" alt="Ilustrasi" className="w-[65%] mt-32" />
        <Link
          to="/"
          className="mt-8 px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded shadow text-sm font-medium text-center"
        >
          Kembali Ke Beranda
        </Link>
      </div>

      {/* Kanan */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-10">
          <h2 className="text-2xl font-bold mb-6">Log in</h2>

          <button className="border w-full py-2 rounded flex items-center justify-center gap-2 mb-6 font-medium">
            <span className="text-gray-500">G</span>
            <span>Log in with Google</span>
          </button>

          <hr className="mb-6" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-semibold text-sm">Username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded mt-1 text-sm"
                placeholder="Masukkan Username"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-sm">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border px-4 py-2 rounded mt-1 text-sm"
                placeholder="Masukkan Password"
                required
              />
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <input type="checkbox" id="remember" className="mt-1" />
              <label htmlFor="remember">Remember Me</label>
            </div>

            <button type="submit" className="bg-yellow-300 hover:bg-yellow-400 w-full py-2 rounded font-bold">
              Log in
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p>
              Don’t have an account? <Link to="/register" className="font-bold">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
