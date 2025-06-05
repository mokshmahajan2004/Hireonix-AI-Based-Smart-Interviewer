// src/pages/ResumeScreening.js
import React, { useState } from 'react';

function ResumeScreening() {
  const [resume, setResume] = useState(null);
  const [jobDesc, setJobDesc] = useState('');

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement API call to backend for ATS compatibility check
    alert("Resume and Job Description submitted for screening.");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-200 px-6 py-20 font-sans">
      <div className="max-w-4xl mx-auto bg-white p-10 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-4">
          📄 Resume Screening
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Upload your resume and paste the job description to check how ATS-friendly your resume is for a specific job.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Upload Resume (PDF/DOCX)</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Paste Job Description</label>
            <textarea
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              rows="6"
              required
              className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Paste the job description here..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Analyze Resume
          </button>
        </form>

        <div className="mt-10 text-center text-sm text-gray-500">
          Note: This tool checks resume keywords, formatting, and relevance to improve ATS success rates.
        </div>
      </div>
    </div>
  );
}

export default ResumeScreening;
