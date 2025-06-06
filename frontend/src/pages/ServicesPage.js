import React from "react";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Resume Screening",
    description:
      "Get instant AI-powered feedback on your resume layout, keywords, skills, and alignment with your desired job role.",
    link: "/resume",
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Mock Interview",
    description:
      "Practice live interviews with AI. Receive real-time insights on your answers, tone, confidence, and communication.",
    link: "/mock-interview",
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Performance Reports",
    description:
      "View past interview analytics, improvement history, and skill-based suggestions in your personalized dashboard.",
    link: "/reports",
    color: "from-yellow-500 to-orange-400",
  },
];

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white px-6 pt-24 pb-20">
      <div className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Our <span className="text-yellow-400">Services</span></h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Explore AI-powered tools designed to enhance your interview preparation journey.
        </p>
      </div>

      {/* Cards */}
      <div className="grid gap-10 md:grid-cols-3 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className={`rounded-xl p-6 bg-gradient-to-br ${service.color} shadow-xl transition transform hover:scale-105`}
          >
            <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
            <p className="text-white/90 mb-6">{service.description}</p>
            <Link
              to={service.link}
              className="inline-block px-4 py-2 bg-black bg-opacity-20 text-white rounded hover:bg-opacity-40 transition"
            >
              Explore →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
