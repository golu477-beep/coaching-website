import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CourseCard from '../components/CourseCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <Navbar />
       
        <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Build Your Future With Quality Education</h1>
            <p className="text-lg md:text-xl text-indigo-200 mb-8">Access world-class learning modules, certified faculty, and career-driven programs.</p>
            <div className="flex justify-center gap-4">
              <a href="/courses" className="px-6 py-3 bg-amber-400 text-indigo-950 font-bold rounded-lg hover:bg-amber-300">Explore Courses</a>
              <a href="/admission" className="px-6 py-3 bg-indigo-700 hover:bg-indigo-600 rounded-lg">Apply Now</a>
            </div>
          </div>
        </section>

      
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CourseCard title="Computer Science" duration="4 Years" fee="₹1,20,000 / yr" icon="💻" desc="Master Full-Stack, AI, Data Structures & Cloud Computing." />
            <CourseCard title="Data Science & AI" duration="3 Years" fee="₹1,10,000 / yr" icon="📊" desc="Learn Python, Machine Learning, and Big Data Analytics." />
            <CourseCard title="Business Admin (BBA)" duration="3 Years" fee="₹85,000 / yr" icon="📈" desc="Core leadership, finance, marketing, and management skills." />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}