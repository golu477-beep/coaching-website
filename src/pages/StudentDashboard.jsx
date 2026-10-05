import React from 'react';

export default function StudentDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, Aarav Sharma!</h1>
            <p className="text-sm text-gray-500">Roll No: EDU202601 • Computer Science</p>
          </div>
          <a href="/login" className="px-4 py-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100">Logout</a>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Attendance</h3>
            <p className="text-3xl font-bold text-indigo-600 mt-2">92%</p>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Current CGPA</h3>
            <p className="text-3xl font-bold text-emerald-600 mt-2">8.9</p>
          </div>
          <div className="bg-white p-6 rounded-xl border shadow-sm">
            <h3 className="text-sm font-medium text-gray-500">Pending Fees</h3>
            <p className="text-3xl font-bold text-amber-600 mt-2">₹0</p>
          </div>
        </div>
      </div>
    </div>
  );
}