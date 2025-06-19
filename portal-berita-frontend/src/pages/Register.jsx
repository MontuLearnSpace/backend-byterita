import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // tambahkan useNavigate
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate(); // inisialisasi navigator
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username: form.name,
        password: form.password,
        role: 'user'
      });
      alert('Register berhasil!');
    } catch (err) {
      alert('Register gagal!');
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
        <button
          onClick={() => navigate('/')}
          className="mt-8 px-6 py-2 bg-gray-300 hover:bg-gray-400 rounded shadow text-sm font-medium"
        >
          Kembali Ke Beranda
        </button>
      </div>

      {/* Kanan */}
      <div className="w-1/2 bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-xl shadow-xl p-10">
          <h2 className="text-2xl font-bold mb-6">Sign up</h2>

          <button className="border w-full py-2 rounded flex items-center justify-center gap-2 mb-6 font-medium">
            <span className="text-gray-500">G</span>
            <span>Sign up with Google</span>
          </button>

          <hr className="mb-6" />

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-semibold text-sm">Name</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                className="w-full border px-4 py-2 rounded mt-1 text-sm" placeholder="Enter Your Full Name" required />
            </div>

            <div>
              <label className="font-semibold text-sm">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange}
                className="w-full border px-4 py-2 rounded mt-1 text-sm" placeholder="Enter Your Email Address" required />
            </div>

            <div>
              <label className="font-semibold text-sm">Password</label>
              <input type="password" name="password" value={form.password} onChange={handleChange}
                className="w-full border px-4 py-2 rounded mt-1 text-sm" placeholder="At least 8 characters" required />
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <input type="checkbox" id="agree" className="mt-1" required />
              <label htmlFor="agree">I agree with <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy</a></label>
            </div>

            <button type="submit" className="bg-yellow-300 hover:bg-yellow-400 w-full py-2 rounded font-bold">
              Sign up
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p>
              Already have an account? <Link to="/login" className="font-bold">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
