import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api, { getErrorMessage, saveSession } from '../lib/api';

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      saveSession(data);
      navigate('/dashboard', { replace: true });
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create your account</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Register as a student to join a class.</p>
        {error && <p role="alert" className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
            <input id="register-name" name="name" type="text" autoComplete="name" required maxLength="100" value={form.name} onChange={updateField} className="w-full border p-2 rounded-lg" />
          </div>
          <div>
            <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="register-email" name="email" type="email" autoComplete="email" required value={form.email} onChange={updateField} className="w-full border p-2 rounded-lg" />
          </div>
          <div>
            <label htmlFor="register-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone <span className="font-normal text-gray-400">(optional)</span></label>
            <input id="register-phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={updateField} className="w-full border p-2 rounded-lg" />
          </div>
          <div>
            <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input id="register-password" name="password" type="password" autoComplete="new-password" required minLength="8" value={form.password} onChange={updateField} className="w-full border p-2 rounded-lg" />
            <p className="mt-1 text-xs text-gray-500">Use at least 8 characters.</p>
          </div>
          <div>
            <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
            <input id="register-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" required value={form.confirmPassword} onChange={updateField} className="w-full border p-2 rounded-lg" />
          </div>
          <button disabled={loading} className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-60">
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-gray-600">Already registered? <Link className="font-semibold text-indigo-600 hover:underline" to="/login">Sign in</Link></p>
      </div>
    </div>
  );
}
