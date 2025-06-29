import { Routes, Route } from 'react-router-dom'; // hilangkan BrowserRouter di sini
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import DetailBerita from './pages/DetailBerita';
import DashboardAdmin from './pages/DashboardAdmin';
import TambahBerita from './pages/TambahBerita';
import EditBerita from './pages/EditBerita';
import Navbar from "./components/Navbar";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/berita/:id" element={<DetailBerita />} />
      <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      <Route path="/admin/tambah" element={<TambahBerita />} />
      <Route path="/admin/edit/:id" element={<EditBerita />} />
    </Routes>
  );
}

export default App;