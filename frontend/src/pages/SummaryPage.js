// src/pages/SummaryPage.js
import React, { useEffect, useState } from "react";

const SummaryPage = () => {
  const [responses, setResponses] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("interviewResponses")) || [];
    setResponses(data);

    // Basic recommendation logic (mock)
    const skippedCount = data.filter((q) => q.status === "unanswered").length;
    const total = data.length;

    const suggestions = [];
    if (skippedCount > 0) {
      suggestions.push("Try not to skip questions. Practice structuring your thoughts quickly.");
    }
    if (skippedCount >= 2) {
      suggestions.push("Work on improving on-the-spot thinking and time-bound communication.");
    }
    if (skippedCount === 0) {
      suggestions.push("Great job! You answered all questions. Just focus on clarity and conciseness.");
    }

    setRecommendations(suggestions);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-[#1e293b] p-8 rounded-2xl border border-gray-700 shadow-xl">
        <h2 className="text-3xl font-bold text-blue-400 mb-4 text-center">
          📊 Interview Summary Report
        </h2>
        <p className="text-center text-gray-400 mb-10">
          Here's a breakdown of your performance with suggestions to improve.
        </p>

        {/* Question List */}
        <ul className="space-y-5 mb-12">
          {responses.map((item, idx) => (
            <li
              key={idx}
              className={`p-5 rounded-xl border ${
                item.status === "answered"
                  ? "border-green-500"
                  : "border-red-500"
              } bg-[#0f172a]`}
            >
              <p className="font-semibold text-blue-300">
                Q{idx + 1}: {item.question}
              </p>
              <p className="mt-2 text-sm">
                Status:{" "}
                <span
                  className={
                    item.status === "answered"
                      ? "text-green-400"
                      : "text-red-400"
                  }
                >
                  {item.status.toUpperCase()}
                </span>
              </p>
            </li>
          ))}
        </ul>

        {/* Recommendations */}
        <div className="bg-[#0f172a] border border-yellow-400 rounded-xl p-6">
          <h3 className="text-xl font-bold text-yellow-400 mb-3">
            📌 AI Recommendations
          </h3>
          <ul className="list-disc pl-6 space-y-2 text-sm text-gray-300">
            {recommendations.map((rec, i) => (
              <li key={i}>{rec}</li>
            ))}
          </ul>
        </div>

        <div className="mt-10 text-center text-sm text-gray-400 italic">
          💬 Feedback is generated based on your interaction. For best results, keep practicing regularly.
        </div>
      </div>
    </div>
  );
};

export default SummaryPage;
