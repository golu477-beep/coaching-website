import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getErrorMessage } from '../lib/api';

const emptyForm = { title: '', description: '', duration: '', fee: '', instructor: '' };

export default function Courses() {
  const [form, setForm] = useState(emptyForm);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function fetchClasses() {
    const { data } = await api.get('/admin/classes');
    return data;
  }

  async function loadClasses() {
    try {
      const data = await fetchClasses();
      setError('');
      setClasses(data);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClasses()
      .then(setClasses)
      .catch((requestError) => setError(getErrorMessage(requestError)))
      .finally(() => setLoading(false));
  }, []);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function createClass(event) {
    event.preventDefault();
    setSaving(true);
    setError('');
    setMessage('');
    try {
      await api.post('/courses', { ...form, fee: Number(form.fee) });
      setForm(emptyForm);
      setMessage('Class created successfully.');
      await loadClasses();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Classes</h1>
            <p className="mt-1 text-sm text-gray-500">Create a class and see its current student count and roster.</p>
          </div>
          <div className="flex gap-3 text-sm">
            <Link to="/admin" className="text-indigo-600 hover:underline">Dashboard</Link>
            <Link to="/admin/students" className="text-indigo-600 hover:underline">All students</Link>
          </div>
        </div>

        {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        {message && <p role="status" className="rounded-lg bg-green-50 p-3 text-sm text-green-700">{message}</p>}

        <form onSubmit={createClass} className="grid grid-cols-1 gap-4 rounded-xl border bg-white p-5 shadow-sm md:grid-cols-2">
          <h2 className="text-lg font-semibold md:col-span-2">Add a class</h2>
          <label className="text-sm font-medium text-gray-700">Class name
            <input name="title" required maxLength="120" value={form.title} onChange={updateField} className="mt-1 w-full rounded-lg border p-2" />
          </label>
          <label className="text-sm font-medium text-gray-700">Duration
            <input name="duration" required value={form.duration} onChange={updateField} placeholder="e.g. 12 weeks" className="mt-1 w-full rounded-lg border p-2" />
          </label>
          <label className="text-sm font-medium text-gray-700">Fee (₹)
            <input name="fee" type="number" min="0" step="0.01" required value={form.fee} onChange={updateField} className="mt-1 w-full rounded-lg border p-2" />
          </label>
          <label className="text-sm font-medium text-gray-700">Instructor <span className="font-normal text-gray-400">(optional)</span>
            <input name="instructor" value={form.instructor} onChange={updateField} className="mt-1 w-full rounded-lg border p-2" />
          </label>
          <label className="text-sm font-medium text-gray-700 md:col-span-2">Description
            <textarea name="description" required rows="3" value={form.description} onChange={updateField} className="mt-1 w-full rounded-lg border p-2" />
          </label>
          <button disabled={saving} className="rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60 md:col-span-2 md:justify-self-start">
            {saving ? 'Saving...' : 'Add class'}
          </button>
        </form>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900">Class rosters</h2>
          {loading ? <p className="text-sm text-gray-500">Loading classes...</p> : classes.length ? classes.map((course) => (
            <article key={course._id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
              <header className="flex flex-wrap items-start justify-between gap-3 border-b p-5">
                <div>
                  <h3 className="font-semibold text-gray-900">{course.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">{course.description}</p>
                  <p className="mt-2 text-xs text-gray-500">{course.duration} · ₹{course.fee}{course.instructor ? ` · ${course.instructor}` : ''}</p>
                </div>
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">{course.students.length} {course.students.length === 1 ? 'student' : 'students'}</span>
              </header>
              {course.students.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-gray-600"><tr><th className="p-3">Student</th><th className="p-3">Email</th><th className="p-3">Phone</th><th className="p-3">Roll No.</th></tr></thead>
                    <tbody>{course.students.map((student) => (
                      <tr key={student._id} className="border-t">
                        <td className="p-3 font-medium">{student.name}</td>
                        <td className="p-3">{student.email}</td>
                        <td className="p-3">{student.phone || '—'}</td>
                        <td className="p-3">{student.rollNo || '—'}</td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              ) : <p className="p-4 text-sm text-gray-500">No students have joined this class yet.</p>}
            </article>
          )) : <p className="rounded-xl border bg-white p-5 text-sm text-gray-500">No classes yet. Add a class above.</p>}
        </section>
      </div>
    </div>
  );
}
