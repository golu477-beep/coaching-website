import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-3">🎓 EduPortal</h3>
          <p className="text-sm text-gray-400">Empowering future leaders with industry-ready skill sets and world-class education.</p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/courses" className="hover:text-amber-400">Courses</a></li>
            <li><a href="/faculty" className="hover:text-amber-400">Faculty</a></li>
            <li><a href="/admission" className="hover:text-amber-400">Admissions</a></li>
            <li><a href="/results" className="hover:text-amber-400">Exam Results</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Student Zone</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/login" className="hover:text-amber-400">Student Portal</a></li>
            <li><a href="/dashboard" className="hover:text-amber-400">Dashboard</a></li>
            <li><a href="/admin" className="hover:text-amber-400">Admin Login</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-3">Contact</h4>
          <p className="text-sm text-gray-400">Email: support@eduportal.edu</p>
          <p className="text-sm text-gray-400 mt-1">Phone: +91 98765 43210</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 border-t border-gray-800 pt-4">
        © 2026 EduPortal Inc. All rights reserved.
      </div>
    </footer>
  );
}