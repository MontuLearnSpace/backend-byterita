import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const HomePage = () => {
  const [beritaUtama, setBeritaUtama] = useState(null);
  const [beritaPopuler, setBeritaPopuler] = useState([]);
  const [beritaLain, setBeritaLain] = useState([]);

  useEffect(() => {
    // Ambil berita utama
    axios.get('http://localhost:5000/api/berita-utama')
      .then(res => setBeritaUtama(res.data))
      .catch(err => console.error('Gagal ambil berita utama:', err));

    // Ambil berita populer
    axios.get('http://localhost:5000/api/berita-populer')
      .then(res => setBeritaPopuler(res.data))
      .catch(err => console.error('Gagal ambil berita populer:', err));

    // Ambil semua berita, filter selain berita utama
    axios.get('http://localhost:5000/api/berita')
      .then(res => {
        const allBerita = res.data;
        if (allBerita.length > 0 && beritaUtama) {
          const filtered = allBerita.filter(b => b.id !== beritaUtama.id);
          setBeritaLain(filtered);
        } else {
          setBeritaLain(allBerita);
        }
      })
      .catch(err => console.error('Gagal ambil berita lainnya:', err));
  }, [beritaUtama]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <div className="max-w-screen-lg mx-auto px-4 py-8 space-y-10">

        {/* SECTION: BERITA UTAMA + POPULER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* BERITA UTAMA */}
          {beritaUtama && (
            <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
              <img
                src={beritaUtama.gambar || '/sample-thumb.jpg'}
                alt={beritaUtama.judul}
                className="w-full md:w-1/2 h-auto object-cover rounded"
              />
              <div>
                <Link to={`/berita/${beritaUtama.id}`}>
                  <h2 className="text-2xl font-bold hover:text-cyan-700">{beritaUtama.judul}</h2>
                </Link>
                <p className="text-sm text-red-600 mt-1">{beritaUtama.kategori}</p>
                <p className="mt-2 text-gray-600 text-sm">
                  {beritaUtama.isi?.slice(0, 220)}...
                </p>
              </div>
            </div>
          )}

          {/* BERITA POPULER */}
          <div>
            <h3 className="text-lg font-bold border-b pb-2 mb-4">MOST POPULAR</h3>
            <div className="space-y-4 max-h-[300px] overflow-y-auto">
              {beritaPopuler.map((item, index) => (
                <Link to={`/berita/${item.id}`} key={item.id} className="block">
                  <p className="text-gray-800 text-sm font-semibold">
                    {String(index + 1).padStart(2, '0')}. {item.judul}
                  </p>
                  <p className="text-xs text-red-600">{item.kategori}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION: HEADLINES / BERITA LAINNYA */}
        <div>
          <h3 className="text-xl font-bold mb-4 border-b pb-2">HEADLINES</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {beritaLain.map(item => (
              <Link to={`/berita/${item.id}`} key={item.id} className="block">
                <img src={item.gambar || '/sample-thumb.jpg'} className="w-full h-32 object-cover rounded" />
                <p className="text-sm mt-2 font-semibold hover:text-cyan-600">{item.judul}</p>
                <p className="text-xs text-red-600">{item.kategori}</p>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* FOOTER */}
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

export default HomePage;
