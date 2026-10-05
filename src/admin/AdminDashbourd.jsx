import React from 'react';

export default function AdminDashboard() {
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Admin Panel Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Total Students</p>
          <p className="text-3xl font-bold text-indigo-600">1,240</p>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm text-gray-500">Active Courses</p>
          <p className="text-3xl font-bold text-indigo-600">18</p>
        </div>
      </div>
    </div>
  );
}