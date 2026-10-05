import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About EduPortal</h1>
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            EduPortal was founded with a clear mission: to make high-quality higher education accessible, flexible, and career-aligned.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="p-6 bg-white rounded-xl border">
              <h3 className="font-bold text-indigo-900 text-xl mb-2">🚀 Our Vision</h3>
              <p className="text-sm text-gray-600">To produce skilled professionals capable of solving real-world technical and business problems.</p>
            </div>
            <div className="p-6 bg-white rounded-xl border">
              <h3 className="font-bold text-indigo-900 text-xl mb-2">💡 Our Values</h3>
              <p className="text-sm text-gray-600">Integrity, innovation, diversity, and student-centered support systems.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}