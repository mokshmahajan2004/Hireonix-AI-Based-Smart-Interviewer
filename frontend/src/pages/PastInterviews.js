// src/pages/PastInterviews.js
import React from 'react';

const pastReports = [
  {
    date: 'May 20, 2025',
    questionCount: 5,
    scores: {
      communication: 7,
      clarity: 6,
      confidence: 8
    },
    suggestion: 'Improve clarity by organizing your thoughts better before answering.'
  },
  {
    date: 'May 10, 2025',
    questionCount: 4,
    scores: {
      communication: 6,
      clarity: 7,
      confidence: 6
    },
    suggestion: 'Work on confidence by maintaining eye contact and reducing filler words.'
  }
];

function PastInterviews() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-200 px-6 py-20 font-sans">
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-xl shadow-xl border border-indigo-200">
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-6">
          📑 Your Past Interviews
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Review detailed feedback from your previous AI-powered interviews and track your growth journey.
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {pastReports.map((report, index) => (
            <div key={index} className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-indigo-700">📅 {report.date}</h3>
                <span className="text-sm font-medium text-indigo-500">{report.questionCount} Questions</span>
              </div>
              <div className="space-y-2 text-gray-700 text-sm">
                <p><strong>🗣 Communication:</strong> {report.scores.communication}/10</p>
                <p><strong>🧠 Clarity:</strong> {report.scores.clarity}/10</p>
                <p><strong>💪 Confidence:</strong> {report.scores.confidence}/10</p>
              </div>
              <div className="mt-4 text-indigo-800 italic text-sm">
                ✍️ <strong>Suggestion:</strong> "{report.suggestion}"
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center text-sm text-gray-500">
          Keep practicing to improve your score. Come back anytime to reflect and grow. 🚀
        </div>
      </div>
    </div>
  );
}

export default PastInterviews;
