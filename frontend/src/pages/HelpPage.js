import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "What is Hireonix?",
    answer:
      "Hireonix is an AI-powered platform offering mock interviews, instant feedback, and resume screening to boost your job readiness.",
  },
  {
    question: "How do mock interviews work?",
    answer:
      "Once you begin, our system asks role-specific questions and listens to your voice answers. AI evaluates your performance on clarity, fluency, and confidence.",
  },
  {
    question: "Can I customize my mock interview?",
    answer:
      "Yes! You can select your role, experience, and skills during onboarding to personalize your interview questions.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We never store your audio or personal data without permission. Your data is encrypted and only used to improve your experience.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can use the Contact page from the sidebar or email us at support@hireonix.ai. We're happy to help!",
  },
];

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex bg-[#020617] text-white min-h-screen font-sans">
      {/* Sidebar (desktop only) */}
      <div className="hidden sm:block">
        <Sidebar />
      </div>

      {/* Main Content */}
<main className="flex-1 w-full px-6 sm:px-8 sm:pl-20 py-16 flex justify-center">
<div className="w-full max-w-5xl sm:ml-4">
          {/* Heading */}
          <h1 className="text-center font-extrabold text-yellow-400 mb-12 leading-tight"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>
            Help & <span className="text-white">Frequently Asked Questions</span>
          </h1>

          {/* FAQ Accordion */}
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`rounded-xl bg-[#0f172a] border border-gray-700 shadow-md transition-all duration-300 ${
                  activeIndex === index ? "ring-1 ring-yellow-400" : "hover:shadow-yellow-300/20"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left text-base sm:text-lg font-medium focus:outline-none group"
                >
                  <span className="text-white group-hover:text-yellow-400 transition">
                    {faq.question}
                  </span>
                  <FiChevronDown
                    className={`ml-2 transform transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180 text-yellow-400" : "text-white/60 group-hover:text-yellow-400"
                    }`}
                    size={24}
                  />
                </button>

                {activeIndex === index && (
                  <div className="px-5 pb-5 text-gray-300 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <h2 className="text-white font-bold mb-3"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
              Still have questions?
            </h2>
            <p className="text-gray-400 mb-6 text-sm sm:text-base">
              Reach out via our <span className="text-yellow-400 font-semibold">Contact page</span>.
            </p>
            <a
              href="/contact"
              className="inline-block bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold shadow hover:bg-yellow-500 transition duration-300"
            >
              Contact Support →
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpPage;
