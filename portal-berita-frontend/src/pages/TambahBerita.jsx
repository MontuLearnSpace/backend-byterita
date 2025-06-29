// src/pages/TambahBerita.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '../utils/checkAuth';
import { useEffect } from 'react';

const TambahBerita = () => {
  const [form, setForm] = useState({ judul: '', isi: '', kategori: '', gambar: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/berita', form);
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
    <div className="max-w-screen-md mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Tambah Berita</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="judul" placeholder="Judul" value={form.judul} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <textarea name="isi" placeholder="Isi berita" value={form.isi} onChange={handleChange} required rows={5} className="w-full border px-4 py-2 rounded" />
        <input name="kategori" placeholder="Kategori" value={form.kategori} onChange={handleChange} required className="w-full border px-4 py-2 rounded" />
        <input name="gambar" placeholder="URL Gambar" value={form.gambar} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <button type="submit" className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700">Tambah</button>
      </form>
    </div>
  );
};

export default TambahBerita;
