import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Results() {
  const [roll, setRoll] = useState('');
  const [result, setResult] = useState(null);

  const checkResult = (e) => {
    e.preventDefault();
    if (roll === '101') {
      setResult({ name: "Aarav Sharma", status: "PASSED", gpa: "8.9", marks: [ { s: "Computer Networks", m: 88 }, { s: "DBMS", m: 92 } ] });
    } else {
      alert('Roll Number not found! (Try: 101)');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Check Semester Result</h2>
            <form onSubmit={checkResult} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Enter Roll Number</label>
                <input type="text" placeholder="e.g. 101" value={roll} onChange={e => setRoll(e.target.value)} required className="w-full border p-2 rounded-lg" />
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700">Search Result</button>
            </form>

            {result && (
              <div className="mt-6 p-4 border rounded-lg bg-green-50 border-green-200">
                <h3 className="font-bold text-lg text-green-900">{result.name}</h3>
                <p className="text-sm text-green-700">Status: {result.status} | CGPA: {result.gpa}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}