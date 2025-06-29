import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar'; // Navbar Reusable

const DetailBerita = () => {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [komentar, setKomentar] = useState('');
  const [listKomentar, setListKomentar] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/berita/${id}`)
      .then(res => setBerita(res.data))
      .catch(err => console.error('Gagal ambil detail berita:', err));

    setListKomentar([
      { nama: 'User A', tanggal: '20 Juni 2025', isi: 'Ini adalah komentar pertama' },
      { nama: 'User B', tanggal: '21 Juni 2025', isi: 'Komentar kedua tentang berita ini' },
    ]);

    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  }, [id]);

  const handleSubmit = () => {
    if (komentar.trim()) {
      setListKomentar(prev => [
        ...prev,
        {
          nama: 'Kamu',
          tanggal: new Date().toLocaleDateString('id-ID'),
          isi: komentar
        }
      ]);
      setKomentar('');
    }
  };

  if (!berita) return <div className="p-8 text-center">Memuat berita...</div>;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="max-w-screen-md mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-bold mb-4">{berita.judul}</h1>
        <p className="text-sm text-gray-500 mb-2">Tanggal Publikasi, Diposting Oleh: Admin</p>
        <div className="aspect-video overflow-hidden mb-6">
          <img
            src={berita.gambar || "/hero-berita.jpg"}
            alt={berita.judul}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <p className="text-gray-700 text-justify leading-relaxed">{berita.isi}</p>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Komentar:</h2>

          {isLogin ? (
            <>
              <textarea
                rows="4"
                value={komentar}
                onChange={e => setKomentar(e.target.value)}
                className="w-full border p-3 rounded resize-none mb-2"
                placeholder="Tulis komentar..."
              />
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-gray-500">{komentar.length} karakter ditulis</p>
                <button
                  onClick={handleSubmit}
                  className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
                >
                  Kirim Komentar
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-red-600 mb-6">*Silakan login terlebih dahulu untuk mengirim komentar.</p>
          )}

          {listKomentar.map((k, i) => (
            <div key={i} className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-white">
                <i className="fas fa-user"></i>
              </div>
              <div>
                <p className="font-semibold">{k.nama}</p>
                <p className="text-xs text-gray-500 mb-1">{k.tanggal}</p>
                <p className="text-sm">{k.isi}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

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

export default DetailBerita;
