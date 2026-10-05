import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import TeacherCard from '../components/TeacherCard';

export default function Faculty() {
  const teachers = [
    { name: "Dr. Rajesh Sharma", role: "Head of Dept", dept: "Computer Science", exp: "15 Yrs" },
    { name: "Prof. Priya Verma", role: "Senior Lecturer", dept: "Data Science", exp: "10 Yrs" },
    { name: "Dr. Anil Kapoor", role: "Associate Professor", dept: "Management", exp: "12 Yrs" },
    { name: "Prof. Sunita Rao", role: "Cyber Security Specialist", dept: "IT Security", exp: "8 Yrs" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meet Our Expert Faculty</h1>
          <p className="text-gray-600 mb-8">Learn from experienced educators and industry pioneers.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((t, i) => <TeacherCard key={i} {...t} />)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}