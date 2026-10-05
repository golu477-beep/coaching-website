import React from 'react';

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Student Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email / Roll No</label>
            <input type="text" className="w-full border p-2 rounded-lg" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" className="w-full border p-2 rounded-lg" />
          </div>
          <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700">Sign In</button>
        </form>
      </div>
    </div>
  );
}