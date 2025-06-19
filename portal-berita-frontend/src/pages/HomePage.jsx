// src/pages/HomePage.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [berita, setBerita] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/berita')
      .then(res => setBerita(res.data))
      .catch(err => console.error('Gagal ambil berita:', err));
  }, []);

  const kategoriMap = berita.reduce((acc, item) => {
    const kategori = item.kategori || 'Lainnya';
    if (!acc[kategori]) acc[kategori] = [];
    acc[kategori].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-white min-h-screen flex flex-col justify-between">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-8 bg-yellow-100 shadow">
        <div className="flex items-center gap-2">
          <img src="/byterita-logo.png" alt="Logo" className="w-16" />
          <span className="text-2xl font-semibold text-cyan-600">Byterita</span>
        </div>
        <div className="flex-1 mx-8">
          <input type="text" placeholder="Penelusuran" className="w-full border rounded px-4 py-1" />
        </div>
        <div className="flex gap-2">
          <button className="bg-yellow-300 hover:bg-yellow-400 px-4 py-1 rounded">Beranda</button>
          <button onClick={() => navigate('/login')} className="bg-black text-white px-4 py-1 rounded">Login</button>
        </div>
      </header>

      {/* Berita Utama */}
      <section className="px-6 py-8">
        <div className="bg-gray-100 rounded p-6">
          <img src="/hero-berita.jpg" alt="Hero" className="rounded mb-4 w-full max-h-[300px] object-cover" />
          <h2 className="text-2xl font-bold mb-2">Judul Berita Utama</h2>
          <p className="text-sm text-gray-600">
            Keterangan singkat tentang berita Keterangan singkat tentang berita.... Keterangan singkat tentang berita....
          </p>
        </div>
      </section>

      {/* Daftar Kategori */}
      <section className="px-6 pb-20">
        {Object.entries(kategoriMap).map(([kategori, items]) => (
          <div key={kategori} className="mb-10">
            <h3 className="text-xl font-bold mb-4">{kategori}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(item => (
                <div key={item.id} className="border rounded p-4 flex gap-4">
                  <img src="/sample-thumb.jpg" alt="Thumb" className="w-24 h-24 rounded object-cover" />
                  <div>
                    <h4 className="font-semibold">{item.judul}</h4>
                    <p className="text-sm text-gray-600">{item.isi?.slice(0, 80)}...</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
        <footer className="bg-yellow-100 px-6 py-6 text-sm text-gray-600 mt-auto">
        <div className="flex flex-col md:flex-row md:justify-between gap-8 items-start">
            <div className="flex items-center gap-6">
            <img src="/byterita-logo.png" alt="Logo" className="w-12" /> {/* Ukuran diperbesar */}
            <div className="flex gap-4 text-2xl">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-1"><p className="font-medium">Topic</p><p>Page</p><p>Page</p></div>
            <div className="space-y-1"><p className="font-medium">Topic</p><p>Page</p><p>Page</p></div>
            <div className="space-y-1"><p className="font-medium">Topic</p><p>Page</p><p>Page</p></div>
            </div>
        </div>
        </footer>
    </div>
  );
};

export default HomePage;