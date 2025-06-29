import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { isAuthenticated } from '../utils/checkAuth';

const DashboardAdmin = () => {
  const [berita, setBerita] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const fetchBerita = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/berita', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBerita(res.data);
      } catch (err) {
        console.error('Gagal ambil data:', err);
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      }
    };

    fetchBerita();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      try {
        await axios.delete(`http://localhost:5000/api/berita/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setBerita(berita.filter(item => item.id !== id));
      } catch (error) {
        console.error('Gagal hapus berita:', error);
        alert('Gagal menghapus berita.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-cyan-700">Dashboard Admin</h1>

      <div className="mb-4">
        <button
          onClick={() => navigate('/admin/tambah')}
          className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
        >
          + Tambah Berita
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow p-4">
        <table className="w-full text-left table-auto border-collapse">
          <thead className="border-b">
            <tr>
              <th className="py-2">#</th>
              <th className="py-2">Judul</th>
              <th className="py-2">Kategori</th>
              <th className="py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {berita.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="py-2">{index + 1}</td>
                <td className="py-2">{item.judul}</td>
                <td className="py-2">{item.kategori || 'Lainnya'}</td>
                <td className="py-2">
                  <button
                    onClick={() => navigate(`/admin/edit/${item.id}`)}
                    className="bg-yellow-400 text-black px-2 py-1 rounded mr-2 hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
            {berita.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  Tidak ada berita.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardAdmin;
