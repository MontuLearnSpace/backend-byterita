// src/pages/EditBerita.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '../utils/checkAuth';

const EditBerita = () => {
  const { id } = useParams();
  const [form, setForm] = useState({ judul: '', isi: '', kategori: '', gambar: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
       navigate('/login');
       return;
    }
    axios.get(`http://localhost:5000/api/berita/${id}`)
      .then(res => setForm(res.data))
      .catch(err => console.error('Gagal ambil data:', err));
  }, [id]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/berita/${id}`, form);
      navigate('/admin/dashboard');
    } catch (err) {
      console.error('Gagal update:', err);
    }
  };

  return (
    <div className="max-w-screen-md mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Edit Berita</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="judul" value={form.judul} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <textarea name="isi" value={form.isi} onChange={handleChange} rows={5} className="w-full border px-4 py-2 rounded" />
        <input name="kategori" value={form.kategori} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <input name="gambar" value={form.gambar} onChange={handleChange} className="w-full border px-4 py-2 rounded" />
        <button type="submit" className="bg-cyan-600 text-white px-6 py-2 rounded hover:bg-cyan-700">Simpan Perubahan</button>
      </form>
    </div>
  );
};

export default EditBerita;
