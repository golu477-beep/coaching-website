import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import Courses from './pages/Courses';
import Faculty from './pages/Faculty';
import Results from './pages/Results';
import About from './pages/About';
import Contact from './pages/Contact';
import Admission from './pages/Admission';
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';

import AdminDashboard from '../src/admin/AdminDashbourd';
import Students from '../src/admin/Students';
import AdminCourses from '../src/admin/Courses';
import Payments from '../src/admin/Payments';
import Notices from '../src/admin/Notices';
import { getSessionUser } from './lib/api';

function AdminRoute({ children }) {
  const user = getSessionUser();
  return user?.role === 'admin' ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>

      <div className="bg-gray-800 text-white text-xs p-2 flex gap-4 overflow-x-auto">
        <span className="font-bold text-amber-400">Quick Links:</span>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/login">Login</Link>
        <Link to="/dashboard">Student Dashboard</Link>
        <Link to="/admin" className="text-green-400 font-bold"> Admin Panel</Link>
      </div>

      <Routes>
      
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<StudentDashboard />} />

        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/students" element={<AdminRoute><Students /></AdminRoute>} />
        <Route path="/admin/courses" element={<AdminRoute><AdminCourses /></AdminRoute>} />
        <Route path="/admin/payments" element={<AdminRoute><Payments /></AdminRoute>} />
        <Route path="/admin/notices" element={<AdminRoute><Notices /></AdminRoute>} />
      </Routes>
    </BrowserRouter>
  );
}