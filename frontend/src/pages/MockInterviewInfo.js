import React from 'react';
import { FaRobot, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MockInterviewInfo = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 pt-28 pb-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 pt-10">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-pink-500 bg-clip-text text-transparent mb-4">
          Mock Interview Powered by AI
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Prepare for real-world interviews with our intelligent mock interview tool that evaluates, guides, and builds your confidence—anytime, anywhere.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-200">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaRobot className="text-yellow-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Real-Time AI Interviewer</h3>
              <p className="text-gray-400">Experience live Q&A sessions through voice or chat with our virtual interviewer.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaCheckCircle className="text-yellow-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Performance Metrics</h3>
              <p className="text-gray-400">Receive scores for confidence, tone, clarity, and relevance in real time.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaCheckCircle className="text-yellow-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Customized Questions</h3>
              <p className="text-gray-400">Get role-based and domain-specific questions curated by AI.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaCheckCircle className="text-yellow-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Instant Improvement Tips</h3>
              <p className="text-gray-400">Unlock suggestions and tips to enhance your next response immediately.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-14 text-center">
        <Link to="/start-interview">
          <button className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-xl hover:bg-yellow-500 transition-all duration-300 shadow-md">
            Try Mock Interview Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MockInterviewInfo;
