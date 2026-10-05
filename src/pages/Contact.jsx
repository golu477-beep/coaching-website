import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <Navbar />
        <div className="max-w-xl mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-xl shadow-md border">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Contact Us</h1>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input type="text" className="w-full border p-2 rounded-lg" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input type="email" className="w-full border p-2 rounded-lg" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea rows="4" className="w-full border p-2 rounded-lg" placeholder="Write your message here..."></textarea>
              </div>
              <button className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}