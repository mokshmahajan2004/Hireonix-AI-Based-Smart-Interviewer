// src/pages/PastInterviews.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PastInterviews() {
  const [pastReports, setPastReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = localStorage.getItem("email"); // ✅ Ensure email is stored on login

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await axios.get(`http://localhost:8000/past-interviews/${userEmail}`);
        setPastReports(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch reports:", error);
        setLoading(false);
      }
    }

    if (userEmail) fetchReports();
  }, [userEmail]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-blue-200 px-6 py-20 font-sans">
      <div className="max-w-6xl mx-auto bg-white p-10 rounded-xl shadow-xl border border-indigo-200">
        <h2 className="text-4xl font-extrabold text-center text-indigo-800 mb-6">
          📑 Your Past Interviews
        </h2>
        <p className="text-center text-gray-600 text-lg mb-12">
          Review detailed feedback from your previous AI-powered interviews and track your growth journey.
        </p>

        {loading ? (
          <p className="text-center text-indigo-600 font-semibold">Loading your past interviews...</p>
        ) : pastReports.length === 0 ? (
          <p className="text-center text-gray-600">No past reports found.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {pastReports.map((report, index) => (
              <div key={index} className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-indigo-700">
  📅 {report.timestamp
    ? new Date(report.timestamp).toLocaleDateString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Invalid Date"}
</h3>

                  <span className="text-sm font-medium text-indigo-500">{report.role}</span>
                </div>
                <div className="text-gray-700 text-sm">
                  <p><strong>📄 File:</strong> {report.file_name}</p>
                </div>
                <div className="mt-4 text-center">
                  <a
                    href={report.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 underline font-medium hover:text-indigo-800"
                  >
                    🔗 View Report
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center text-sm text-gray-500">
          Keep practicing to improve your score. Come back anytime to reflect and grow. 🚀
        </div>
      </div>
    </div>
  );
}

export default PastInterviews;
