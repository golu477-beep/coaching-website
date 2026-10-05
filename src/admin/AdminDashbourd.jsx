import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getErrorMessage } from '../lib/api';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ students: 0, classes: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadCounts() {
      try {
        const [studentsResponse, classesResponse] = await Promise.all([
          api.get('/admin/students'),
          api.get('/admin/classes'),
        ]);
        setCounts({ students: studentsResponse.data.length, classes: classesResponse.data.length });
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      }
    }
    loadCounts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Admin dashboard</h1>
        <p className="mb-6 text-gray-600">Review student registrations and class enrollment.</p>
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Link to="/admin/students" className="rounded-xl border bg-white p-6 shadow-sm hover:border-indigo-300">
            <p className="text-sm text-gray-500">Registered students</p>
            <p className="mt-2 text-3xl font-bold text-indigo-600">{counts.students}</p>
            <p className="mt-2 text-sm text-indigo-600">View student details →</p>
          </Link>
          <Link to="/admin/courses" className="rounded-xl border bg-white p-6 shadow-sm hover:border-indigo-300">
            <p className="text-sm text-gray-500">Classes</p>
            <p className="mt-2 text-3xl font-bold text-indigo-600">{counts.classes}</p>
            <p className="mt-2 text-sm text-indigo-600">Add class and view student rosters →</p>
          </Link>
        </div>
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link to="/admin/students" className="text-indigo-600 hover:underline">Manage students</Link>
          <Link to="/admin/courses" className="text-indigo-600 hover:underline">Manage classes</Link>
          <Link to="/admin/payments" className="text-indigo-600 hover:underline">Payments</Link>
          <Link to="/admin/notices" className="text-indigo-600 hover:underline">Notices</Link>
        </nav>
      </div>
    </div>
  );
}
