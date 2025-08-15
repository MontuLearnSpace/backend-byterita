import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '../utils/checkAuth';

const TambahBerita = () => {
  const [form, setForm] = useState({ judul: '', isi: '', kategori: '', gambar: '' });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/berita', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Gagal tambah berita:', err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <div className="bg-yellow-100 flex items-center justify-between px-6 py-4 shadow">
        <div className="flex items-center gap-3">
          <img src="/byterita-logo.png" alt="Logo" className="w-10" />
          <h1 className="font-bold text-xl text-cyan-700">Byterita</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-yellow-300 hover:bg-yellow-400 text-sm px-4 py-1 rounded shadow"
          >
            Dashboard Admin
          </button>
        </div>
      </div>

      {/* Form Tambah Berita */}
      <main className="flex-1 px-6 py-10 max-w-screen-md mx-auto w-full">
        <h1 className="text-3xl font-bold mb-6 text-cyan-700">Tambah Berita</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="judul"
            placeholder="Judul"
            value={form.judul}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            name="isi"
            placeholder="Isi berita"
            value={form.isi}
            onChange={handleChange}
            required
            rows={5}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="kategori"
            placeholder="Kategori"
            value={form.kategori}
            onChange={handleChange}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            name="gambar"
            placeholder="URL Gambar"
            value={form.gambar}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700"
          >
            Tambah
          </button>
        </form>
      </main>

      {/* Footer */}
      <footer className="bg-yellow-100 px-6 py-6 text-sm text-gray-600 mt-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 items-start">
          <div className="flex items-center gap-6">
            <img src="/byterita-logo.png" alt="Logo" className="w-12" />
            <div className="flex gap-4 text-2xl">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TambahBerita;
