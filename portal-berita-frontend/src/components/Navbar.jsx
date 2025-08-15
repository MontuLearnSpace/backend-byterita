import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLogin(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-yellow-100 shadow relative">
      {/* Kiri: Logo */}
      <div className="flex items-center gap-2">
        <img src="/byterita-logo.png" alt="Logo" className="w-12" />
        <span className="text-2xl font-semibold text-cyan-600">Byterita</span>
      </div>

      {/* Tengah: Kategori */}
      <nav className="hidden md:flex gap-4 text-sm font-medium">
        <button onClick={() => navigate('/')} className="hover:text-cyan-700">Beranda</button>
        <button onClick={() => navigate('/kategori/Teknologi')} className="hover:text-cyan-700">Teknologi</button>
        <button onClick={() => navigate('/kategori/Digital')} className="hover:text-cyan-700">Digital</button>
        <button onClick={() => navigate('/kategori/Media%20Sosial')} className="hover:text-cyan-700">Media Sosial</button>
        <button onClick={() => navigate('/kategori/Cyberpolitik')} className="hover:text-cyan-700">Cyberpolitik</button>
        <button onClick={() => navigate('/kategori/Ekonomi')} className="hover:text-cyan-700">Ekonomi</button>
      </nav>

      {/* Kanan: Pencarian + Login/User */}
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Penelusuran"
          className="text-sm px-3 py-1 border rounded w-40"
        />

        {!isLogin ? (
          <button
            onClick={() => navigate('/login')}
            className="bg-black text-white text-sm px-3 py-1 rounded hover:bg-gray-800"
          >
            Login
          </button>
        ) : (
          <div className="relative">
            <button onClick={toggleDropdown}>
              <img
                src="/user-icon.png"
                alt="User"
                className="w-8 h-8 rounded-full bg-white"
              />
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white text-black border rounded shadow-md z-50">
                <button
                  onClick={() => {
                    navigate('/admin/dashboard');
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
