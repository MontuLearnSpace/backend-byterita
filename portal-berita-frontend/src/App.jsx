// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage'; // 👈 import halaman beranda

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* Tambahkan ini */}
        <Route path="/login" element={<Login />} />         {/* Halaman login */}
        <Route path="/register" element={<Register />} />        
      </Routes>
    </Router>
  );
}

export default App;