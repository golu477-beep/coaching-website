import React from 'react';

export default function CourseCard({ title, duration, fee, icon, desc }) {
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition p-6 flex flex-col justify-between">
      <div>
        <div className="text-4xl mb-4">{icon || '📚'}</div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{desc}</p>
      </div>
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
        <span className="text-gray-500">⏱ {duration}</span>
        <span className="font-bold text-indigo-700 text-lg">{fee}</span>
      </div>
    </div>
  );
}