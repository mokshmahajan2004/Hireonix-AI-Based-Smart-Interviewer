// src/pages/Dashboard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: 'Start Interview',
      description: 'Begin a new AI-powered mock interview session.',
      route: '/start-interview'
    },
    {
      title: 'Resume Screening',
      description: 'Upload your resume and check job compatibility.',
      route: '/resume-screening'
    },
    {
      title: 'Past Interviews',
      description: 'Review your previous interview feedback and history.',
      route: '/past-interviews'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-200 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Welcome to Your Dashboard
        </h1>
        <div className="grid gap-8 md:grid-cols-3 sm:grid-cols-1">
          {cards.map((card, index) => (
            <div
              key={index}
              onClick={() => navigate(card.route)}
              className="cursor-pointer bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">{card.title}</h2>
              <p className="text-gray-600 text-sm">{card.description}</p>
              <div className="mt-4 text-indigo-600 font-medium hover:underline">Go →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
