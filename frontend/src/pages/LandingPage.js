// src/pages/LandingPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-indigo-100 to-blue-200 font-sans">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-40">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
          Practice Smart. Perform Better.
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl mb-8">
          Ace your next interview with AI-powered mock interviews, instant feedback, and resume screening. Designed for students, job seekers, and professionals.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-indigo-600 text-white px-8 py-4 rounded-xl shadow-lg text-lg hover:bg-indigo-700 transition duration-300"
        >
          Get Started
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-6">About Us</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to empower individuals with personalized, AI-driven interview experiences that mimic real-world scenarios. Whether you're preparing for your first internship or aiming for a leadership role, Smart Interviewer helps you gain confidence, improve communication, and track your progress.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-8 bg-indigo-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-12">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">AI Mock Interviews</h3>
              <p className="text-gray-600">Answer curated questions, get evaluated on soft skills, and receive improvement tips instantly.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">Resume Screening</h3>
              <p className="text-gray-600">Upload your resume and let our AI match it against job requirements to show compatibility and suggestions.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
              <h3 className="text-xl font-semibold text-indigo-700 mb-2">Performance Tracking</h3>
              <p className="text-gray-600">Access your past interviews, feedback, and progress to help you prepare smarter over time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-indigo-700 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-2">Smart Interviewer</h3>
            <p className="text-sm">Your AI-powered companion for mock interviews, resume evaluation, and skill tracking.</p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#hero" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#services" className="hover:underline">Services</a></li>
              <li><a href="/login" className="hover:underline">Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-2">Contact</h4>
            <p className="text-sm">Email: support@smartinterviewer.com</p>
            <p className="text-sm">Phone: +91 98765 43210</p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4 text-sm">
              <a href="#" className="hover:underline">LinkedIn</a>
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-200 mt-10">
          © {new Date().getFullYear()} Smart Interviewer. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
