import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';

export default function Courses() {
  const list = [
    { title: "B.Tech Computer Science", duration: "4 Years", fee: "₹1,20,000/yr", icon: "💻", desc: "Full-Stack Development, AI, DSA & Cloud." },
    { title: "B.Sc Data Science", duration: "3 Years", fee: "₹1,10,000/yr", icon: "📊", desc: "Python, Machine Learning & Statistics." },
    { title: "Bachelor of Business Admin", duration: "3 Years", fee: "₹85,000/yr", icon: "📈", desc: "Finance, Marketing & HR Management." },
    { title: "Cyber Security Degree", duration: "4 Years", fee: "₹1,30,000/yr", icon: "🔒", desc: "Ethical Hacking, Network Security & Forensics." },
    { title: "UI/UX Design Master", duration: "1 Year", fee: "₹60,000", icon: "🎨", desc: "Figma, User Research & Design Systems." }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Academic Programs</h1>
          <p className="text-gray-600 mb-8">Choose from our industry-accredited degree and diploma courses.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {list.map((c, i) => <CourseCard key={i} {...c} />)}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}