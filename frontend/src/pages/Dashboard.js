import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // ✅ import the sidebar

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
    {/* ✅ Reusable Sidebar */}
    <Sidebar />

    {/* Main Content */}
    <main className="flex-1 transition-all duration-300 ml-16 group-hover:ml-56 px-6 pt-24 pb-16 bg-[#020617]">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-2">
          Welcome Back, Candidate 👋
        </h1>
        <p className="text-center text-gray-300 text-lg mb-12">
          Explore the tools designed to enhance your interview skills and
          track your journey to success.
        </p>

        {/* Dashboard Cards */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div
              key={index}
              role="button"
              tabIndex={0}
              onClick={() => navigate(card.route)}
              onKeyDown={(e) => e.key === "Enter" && navigate(card.route)}
              className="cursor-pointer bg-[#0f172a] border border-gray-700 hover:border-yellow-400 p-6 rounded-2xl shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <div className="text-5xl mb-4">{card.icon}</div>
              <h2 className="text-2xl font-semibold text-yellow-400 mb-2">
                {card.title}
              </h2>
              <p className="text-gray-300 text-sm leading-relaxed">
                {card.description}
              </p>
              <div className="mt-4 text-yellow-400 font-semibold hover:underline">
                Explore →
              </div>
            </div>
          ))}
        </div>

        {/* Progress Overview */}
        <div className="mt-16 bg-[#0f172a] border border-gray-700 rounded-xl p-6 text-center shadow-md">
          <h3 className="text-xl font-bold text-white mb-2">
            Your Progress Overview
          </h3>
          <p className="text-gray-400 text-sm">
            Keep track of your interviews, feedback ratings, and skill
            development trends over time. <br />
            <span className="text-yellow-400">Coming soon!</span>
          </p>
        </div>
      </div>
    </main>
  </div>
);

};

export default Dashboard;
