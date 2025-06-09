// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Start Interview',
      description: 'Begin a new AI-powered mock interview session and test your readiness in real-world scenarios.',
      route: '/start-interview',
      icon: '🗣️'
    },
    {
      title: 'Resume Screening',
      description: 'Upload your resume and see how compatible it is with your dream job using AI analytics.',
      route: '/resume-screening',
      icon: '📄'
    },
    {
      title: 'Past Interviews',
      description: 'Access a detailed history of your previous interviews and feedback to improve further.',
      route: '/past-interviews',
      icon: '📊'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-200 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-2">
          Welcome Back, Candidate 👋
        </h1>
        <p className="text-center text-gray-600 text-lg mb-12">
          Explore the tools designed to enhance your interview skills and track your journey to success.
        </p>

        <div className="grid gap-10 md:grid-cols-3 sm:grid-cols-1">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.route)}
              className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
            >
              <div className="text-5xl mb-4">{card.icon}</div>
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{card.title}</h2>
              <p className="text-gray-600 text-sm leading-relaxed">{card.description}</p>
              <div className="mt-4 text-indigo-600 font-semibold hover:underline">Explore →</div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white shadow-md rounded-xl p-6 text-center">
          <h3 className="text-xl font-bold text-gray-800 mb-2">Your Progress Overview</h3>
          <p className="text-gray-600 text-sm">
            Keep track of your interviews, feedback ratings, and skill development trends over time. Coming soon!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
