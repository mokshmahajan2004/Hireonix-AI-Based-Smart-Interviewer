import React from 'react';
import { FaFileAlt, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ResumeInfo = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white px-6 pt-28 pb-16">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12 pt-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4 pb-6">
          AI-Powered Resume Screening
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto">
          Enhance your resume with actionable insights and keyword suggestions tailored to your dream job. Make it ATS-friendly and stand out in the crowd.
        </p>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 text-gray-200">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaFileAlt className="text-yellow-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Instant Format Feedback</h3>
              <p className="text-gray-400">Analyze your layout, grammar, and structure instantly with AI.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaCheckCircle className="text-yellow-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Keyword Optimization</h3>
              <p className="text-gray-400">Discover and fill missing keywords based on your job role.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <FaCheckCircle className="text-yellow-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">ATS Compatibility Score</h3>
              <p className="text-gray-400">Get scoring based on how well your resume passes Applicant Tracking Systems.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaCheckCircle className="text-yellow-400 text-xl mt-1" />
            <div>
              <h3 className="text-xl font-semibold">Impact Suggestions</h3>
              <p className="text-gray-400">Receive tips to improve clarity, tone, and readability to impress recruiters.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-14 text-center">
        <Link to="/resume-screening">
          <button className="bg-yellow-400 text-black font-semibold px-8 py-3 rounded-xl hover:bg-yellow-500 transition-all duration-300 shadow-md">
            Try Resume Screening Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ResumeInfo;
