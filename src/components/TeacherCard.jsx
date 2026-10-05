import React from 'react';

export default function TeacherCard({ name, role, exp, dept }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center hover:shadow-md transition">
      <div className="w-20 h-20 bg-indigo-100 text-indigo-800 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
        {name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 className="font-bold text-gray-900 text-lg">{name}</h3>
      <p className="text-indigo-600 text-sm font-medium">{role}</p>
      <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
        {dept} • {exp} Experience
      </span>
    </div>
  );
}