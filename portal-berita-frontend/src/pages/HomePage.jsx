import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Navbar reusable

const HomePage = () => {
  const [berita, setBerita] = useState([]);

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
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Berita Utama */}
      <section className="px-6 py-8 max-w-screen-lg mx-auto w-full">
        <div className="bg-gray-100 rounded overflow-hidden shadow">
          <div className="w-full aspect-video overflow-hidden">
            <img src="/hero-berita.jpg" alt="Hero" className="object-cover w-full h-full" />
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">Judul Berita Utama</h2>
            <p className="text-sm text-gray-600">
              Keterangan singkat tentang berita... Keterangan singkat tentang berita...
            </p>
          </div>
        </div>
      </section>

      {/* Daftar Berita Per Kategori */}
      <section className="px-6 pb-20 max-w-screen-lg mx-auto w-full">
        {Object.entries(kategoriMap).map(([kategori, items]) => (
          <div key={kategori} className="mb-10">
            <h3 className="text-xl font-bold mb-4">{kategori}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map(item => (
                <div key={item.id} className="border rounded overflow-hidden shadow hover:shadow-md transition">
                  <Link to={`/berita/${item.id}`} className="block w-full aspect-video overflow-hidden">
                    <img
                      src={item.gambar || '/sample-thumb.jpg'}
                      alt={item.judul}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-200"
                    />
                  </Link>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg">{item.judul}</h4>
                    <p className="text-sm text-gray-600 mb-2">{item.isi?.slice(0, 80)}...</p>
                    <Link to={`/berita/${item.id}`} className="text-cyan-600 hover:underline text-sm">
                      Lihat Detail →
                    </Link>
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
            <img src="/byterita-logo.png" alt="Logo" className="w-12" />
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
