import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getErrorMessage, saveSession } from '../lib/api';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      saveSession(data);
      navigate(data.user.role === 'admin' ? '/admin' : '/dashboard', { replace: true });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Welcome back</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Sign in to your student account.</p>
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="login-email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="w-full border p-2 rounded-lg" />
          </div>
          <div>
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="login-password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className="w-full border p-2 rounded-lg" />
          </div>
          <button disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-600">New here? <Link className="font-semibold text-indigo-600 hover:underline" to="/register">Create an account</Link></p>
      </div>
    </div>
  );
}
