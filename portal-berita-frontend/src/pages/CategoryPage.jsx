// src/pages/KategoriPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const KategoriPage = () => {
  const { namaKategori } = useParams();
  const [berita, setBerita] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/berita`)
      .then(res => {
        const filtered = res.data.filter(item => item.kategori.toLowerCase() === namaKategori.toLowerCase());
        setBerita(filtered);
      })
      .catch(err => console.error('Gagal ambil berita kategori:', err));
  }, [namaKategori]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-screen-lg mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 capitalize">Kategori: {namaKategori}</h1>
        {berita.length === 0 ? (
          <p className="text-gray-600">Tidak ada berita di kategori ini.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {berita.map(item => (
              <Link key={item.id} to={`/berita/${item.id}`} className="block">
                <img src={item.gambar || '/sample-thumb.jpg'} className="w-full h-40 object-cover rounded" />
                <p className="text-sm font-semibold mt-2 hover:text-cyan-700">{item.judul}</p>
                <p className="text-xs text-red-600">{item.kategori}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default KategoriPage;
