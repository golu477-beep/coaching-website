import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Admission() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-xl shadow-md border">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Online Admission Application</h1>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input type="text" className="w-full border p-2 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input type="text" className="w-full border p-2 rounded-lg" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
                <select className="w-full border p-2 rounded-lg">
                  <option>B.Tech Computer Science</option>
                  <option>B.Sc Data Science</option>
                  <option>Bachelor of Business Admin</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">High School GPA / Marks %</label>
                <input type="text" className="w-full border p-2 rounded-lg" placeholder="e.g. 85%" />
              </div>
              <button className="w-full bg-amber-500 text-indigo-950 font-bold py-3 rounded-lg hover:bg-amber-400">Submit Application</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}