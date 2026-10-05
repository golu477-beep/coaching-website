import { useCallback, useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import api, { clearSession, getErrorMessage, getSessionUser } from '../lib/api';

export default function StudentDashboard() {
  const user = getSessionUser();
  const [profile, setProfile] = useState(user);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [joiningId, setJoiningId] = useState('');

  const fetchDashboard = useCallback(() => Promise.all([
    api.get('/auth/me'),
    api.get('/courses'),
  ]), []);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchDashboard()
        .then(([profileResponse, coursesResponse]) => {
          setError('');
          setProfile(profileResponse.data);
          setCourses(coursesResponse.data);
        })
        .catch((requestError) => setError(getErrorMessage(requestError)))
        .finally(() => setLoading(false));
    }
  }, [fetchDashboard]);

  if (!localStorage.getItem('token')) return <Navigate to="/login" replace />;
  if (profile?.role === 'admin') return <Navigate to="/admin" replace />;

  const enrolledIds = new Set((profile?.enrolledCourses || []).map((course) => course._id));

  async function joinClass(courseId) {
    setJoiningId(courseId);
    setError('');
    try {
      await api.post(`/courses/${courseId}/enroll`);
      const [profileResponse, coursesResponse] = await fetchDashboard();
      setProfile(profileResponse.data);
      setCourses(coursesResponse.data);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setJoiningId('');
    }
  }

  function logout() {
    clearSession();
    window.location.assign('/login');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded-xl shadow-sm border flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {profile?.name || user?.name || 'Student'}!</h1>
            <p className="text-sm text-gray-500">{profile?.email || user?.email}</p>
          </div>
          <div className="flex gap-3">
            <Link to="/courses" className="px-4 py-2 text-sm bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100">Browse courses</Link>
            <button onClick={logout} className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100">Logout</button>
          </div>
        </header>

        {error && <p role="alert" className="rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</p>}
        {loading ? <p className="text-gray-600">Loading your classes...</p> : (
          <>
            <section className="bg-white p-6 rounded-xl border shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">My classes</h2>
                <span className="text-sm text-gray-500">{profile?.enrolledCourses?.length || 0} joined</span>
              </div>
              {profile?.enrolledCourses?.length ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {profile.enrolledCourses.map((course) => (
                    <li key={course._id} className="rounded-lg border p-4">
                      <h3 className="font-semibold text-gray-800">{course.title}</h3>
                      <p className="mt-1 text-sm text-gray-500">{course.duration}</p>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-sm text-gray-500">You have not joined a class yet. Choose one below to get started.</p>}
            </section>

            <section className="bg-white p-6 rounded-xl border shadow-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Available classes</h2>
              {courses.length ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course) => {
                    const isEnrolled = enrolledIds.has(course._id);
                    return (
                      <li key={course._id} className="rounded-xl border p-5">
                        <div className="flex justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-gray-800">{course.title}</h3>
                            <p className="mt-1 text-sm text-gray-600">{course.description}</p>
                            <p className="mt-3 text-xs text-gray-500">{course.duration} · ₹{course.fee}</p>
                          </div>
                          <button
                            disabled={isEnrolled || joiningId === course._id}
                            onClick={() => joinClass(course._id)}
                            className="self-start shrink-0 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-600"
                          >
                            {isEnrolled ? 'Joined' : joiningId === course._id ? 'Joining...' : 'Join class'}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : <p className="text-sm text-gray-500">No classes are available right now.</p>}
            </section>
          </>
        )}
      </div>
    </div>
  );
}
