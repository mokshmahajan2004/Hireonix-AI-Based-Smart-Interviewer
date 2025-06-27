import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      title: "Start Interview",
      description:
        "Begin a new AI-powered mock interview session and test your readiness in real-world scenarios.",
      route: "/pre-interview",
      icon: "🗣️",
    },
    {
      title: "Resume Screening",
      description:
        "Upload your resume and see how compatible it is with your dream job using AI analytics.",
      route: "/resume-screening",
      icon: "📄",
    },
    {
      title: "Past Interviews",
      description:
        "Access a detailed history of your previous interviews and feedback to improve further.",
      route: "/past-interviews",
      icon: "📊",
    },
  ];

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
      <Sidebar />

      <main className="flex-1 transition-all duration-300 ml-16 group-hover:ml-56 px-6 pt-24 pb-16 bg-[#020617]">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-4 text-yellow-400">
            Welcome Back, Candidate 👋
          </h1>
          <p className="text-center text-gray-300 text-lg mb-12 max-w-2xl mx-auto">
            Explore AI-powered tools designed to sharpen your skills, track your performance, and prepare you for success.
          </p>

          {/* Dashboard Cards */}
<div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {cards.map((card, index) => (
              <div
                key={index}
                role="button"
                tabIndex={0}
                onClick={() => navigate(card.route)}
                onKeyDown={(e) => e.key === "Enter" && navigate(card.route)}
                className="cursor-pointer bg-[#0f172a] border border-gray-700 hover:border-yellow-400 p-6 rounded-2xl shadow-md hover:shadow-yellow-300/20 transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <div className="text-5xl mb-4 animate-pulse drop-shadow-xl">{card.icon}</div>
                <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
                  {card.title}
                </h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {card.description}
                </p>
                <div className="text-yellow-300 font-semibold hover:underline transition duration-200">
                  Explore →
                </div>
              </div>
            ))}
          </div>

          {/* Progress Overview */}
          <div className="mt-20 bg-[#0f172a] border border-yellow-400 rounded-xl p-8 text-center shadow-lg hover:shadow-yellow-300/30 transition duration-300">
            <h3 className="text-2xl font-bold text-white mb-3">
              📈 Your Progress Overview
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xl mx-auto">
              Keep track of your interviews, performance scores, and AI-driven improvement suggestions.<br />
              <span className="text-yellow-400 font-medium">Advanced analytics coming soon!</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;