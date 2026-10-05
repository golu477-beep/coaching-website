import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-amber-400 text-indigo-900 p-2 rounded-lg font-bold text-xl">🎓</div>
            <span className="font-bold text-xl tracking-tight">EduPortal</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6 font-medium text-sm">
            <a href="/" className="hover:text-amber-400 transition">Home</a>
            <a href="/courses" className="hover:text-amber-400 transition">Courses</a>
            <a href="/faculty" className="hover:text-amber-400 transition">Faculty</a>
            <a href="/results" className="hover:text-amber-400 transition">Results</a>
            <a href="/about" className="hover:text-amber-400 transition">About</a>
            <a href="/contact" className="hover:text-amber-400 transition">Contact</a>
            <a href="/admission" className="hover:text-amber-400 transition">Admission</a>
          </div>

          <div className="hidden md:flex items-center space-x-3">
            <a href="/login" className="px-4 py-2 text-sm rounded-lg border border-indigo-400 hover:bg-indigo-800 transition">Login</a>
            <a href="/register" className="px-4 py-2 text-sm rounded-lg bg-amber-400 text-indigo-950 font-semibold hover:bg-amber-300 transition">Register</a>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-300 hover:text-white">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-indigo-950">
          <a href="/" className="block py-2 text-gray-200 hover:text-amber-400">Home</a>
          <a href="/courses" className="block py-2 text-gray-200 hover:text-amber-400">Courses</a>
          <a href="/faculty" className="block py-2 text-gray-200 hover:text-amber-400">Faculty</a>
          <a href="/results" className="block py-2 text-gray-200 hover:text-amber-400">Results</a>
          <a href="/about" className="block py-2 text-gray-200 hover:text-amber-400">About</a>
          <a href="/contact" className="block py-2 text-gray-200 hover:text-amber-400">Contact</a>
          <a href="/admission" className="block py-2 text-gray-200 hover:text-amber-400">Admission</a>
          <div className="pt-2 flex flex-col gap-2">
            <a href="/login" className="text-center py-2 rounded border border-indigo-400">Login</a>
            <a href="/register" className="text-center py-2 rounded bg-amber-400 text-indigo-950 font-semibold">Register</a>
          </div>
        </div>
      )}
    </nav>
  );
}