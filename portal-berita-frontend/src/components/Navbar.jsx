// src/components/Navbar.jsx
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
    <header className="flex items-center justify-between px-6 py-8 bg-yellow-100 shadow relative">
      <div className="flex items-center gap-2">
        <img src="/byterita-logo.png" alt="Logo" className="w-16" />
        <span className="text-2xl font-semibold text-cyan-600">Byterita</span>
      </div>

      <div className="flex-1 mx-8">
        <input type="text" placeholder="Penelusuran" className="w-full border rounded px-4 py-1" />
      </div>

      <div className="flex gap-2 items-center relative">
        <button onClick={() => navigate('/')} className="bg-yellow-300 hover:bg-yellow-400 px-4 py-1 rounded">
          Beranda
        </button>

        {!isLogin ? (
          <button onClick={() => navigate('/login')} className="bg-black text-white px-4 py-1 rounded">
            Login
          </button>
        ) : (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="bg-cyan-600 text-white px-4 py-1 rounded"
            >
              ☰
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
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
