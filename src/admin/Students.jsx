import React from 'react';

export default function Students() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Manage Students</h2>
      <div className="bg-white rounded-xl border p-4">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b"><th className="p-2">Name</th><th className="p-2">Roll</th><th className="p-2">Course</th></tr>
          </thead>
          <tbody>
            <tr><td className="p-2">Aarav Sharma</td><td className="p-2">101</td><td className="p-2">B.Tech CS</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}