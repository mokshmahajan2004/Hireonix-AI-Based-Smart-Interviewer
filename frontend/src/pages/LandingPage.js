import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-200 font-sans">
      <div className="flex flex-col items-center justify-center text-center py-60 px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
          Welcome to AI-Based Smart Interviewer
        </h1>
        <p className="text-lg text-gray-700 max-w-2xl">
          This platform provides AI-powered mock interviews, resume analysis, and feedback to help you succeed in your career journey.
        </p>
        <div className="mt-8 space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow hover:bg-indigo-700"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
