import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getErrorMessage } from '../lib/api';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadStudents() {
      try {
        const { data } = await api.get('/admin/students');
        setStudents(data);
      } catch (requestError) {
        setError(getErrorMessage(requestError));
      } finally {
        setLoading(false);
      }
    }
    loadStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Registered students</h1>
            <p className="mt-1 text-sm text-gray-500">Student contact details and classes they have joined.</p>
          </div>
          <div className="flex gap-3 text-sm">
            <Link to="/admin" className="text-indigo-600 hover:underline">Dashboard</Link>
            <Link to="/admin/courses" className="text-indigo-600 hover:underline">Classes</Link>
          </div>
        </div>
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          {loading ? <p className="p-5 text-sm text-gray-500">Loading students...</p> : (
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600">
                <tr><th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Phone</th><th className="p-3">Roll No.</th><th className="p-3">Classes joined</th><th className="p-3">Registered</th></tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student._id} className="border-t align-top">
                    <td className="p-3 font-medium text-gray-800">{student.name}</td>
                    <td className="p-3">{student.email}</td>
                    <td className="p-3">{student.phone || '—'}</td>
                    <td className="p-3">{student.rollNo || '—'}</td>
                    <td className="p-3">{student.enrolledCourses?.length ? student.enrolledCourses.map((course) => course.title).join(', ') : 'None yet'}</td>
                    <td className="p-3 whitespace-nowrap">{new Date(student.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
                {!students.length && <tr><td colSpan="6" className="p-5 text-center text-gray-500">No student accounts have registered yet.</td></tr>}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
