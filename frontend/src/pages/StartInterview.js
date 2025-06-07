import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import "../index.css";

// 🧠 Full master question bank
const masterQuestions = [
  "Tell me about yourself.",
  "Why do you want this job?",
  "What are your strengths and weaknesses?",
  "Describe a challenge you faced and how you handled it.",
  "Where do you see yourself in 5 years?",
  "What motivates you to work?",
  "How do you handle criticism?",
  "Tell me about a successful project you led.",
  "How do you prioritize tasks under pressure?",
  "What is your biggest professional achievement?"
];

const StartInterview = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [timer, setTimer] = useState(60);

  // ⏳ Load questions from profile (on component mount)
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("interviewProfile"));
    const questionCount = parseInt(profile?.questionCount || "5");

    // Slice from masterQuestions
    const selectedQuestions = masterQuestions.slice(0, questionCount);
    setQuestions(selectedQuestions);
  }, []);

  // ⏱ Timer Logic (resets on question change)
  useEffect(() => {
    if (questions.length === 0) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          handleNext(true); // auto-skip
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [currentIndex, questions]);

  const handleNext = (isSkipped = false) => {
    const currentQuestion = questions[currentIndex];
    const responseObj = {
      question: currentQuestion,
      status: isSkipped ? "unanswered" : "answered"
    };

    const updatedResponses = [...responses, responseObj];
    setResponses(updatedResponses);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimer(60);
    } else {
      localStorage.setItem("interviewResponses", JSON.stringify(updatedResponses));
      alert("Interview complete! You will be redirected to summary.");
      navigate("/summary");
    }
  };

  if (questions.length === 0) {
    return (
      <div className="text-white flex justify-center items-center min-h-screen text-xl">
        Loading interview questions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4 py-12 md:px-10 text-white">
      <div className="max-w-6xl mx-auto bg-[#1e293b] p-8 md:p-12 rounded-3xl border border-[#334155] shadow-[0_0_25px_rgba(0,0,0,0.3)]">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-400 mb-4">
          🎤 Mock Interview Session
        </h2>
        <p className="text-center text-gray-300 mb-10 text-sm md:text-base">
          You will be <span className="text-yellow-400 font-semibold">recorded live</span>. Speak confidently within the 60-second timer.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Webcam Preview */}
          <div className="bg-black border border-gray-700 rounded-2xl overflow-hidden shadow-lg">
            <Webcam
              audio={true}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                width: 400,
                height: 300,
                facingMode: "user"
              }}
              className="rounded-2xl w-full h-full object-cover"
            />
          </div>

          {/* Question Card */}
          <div className="bg-gradient-to-br from-[#1f2937] to-[#111827] border border-blue-800 rounded-2xl p-6 md:p-8 shadow-lg">
            <p className="text-sm text-gray-400 mb-1">
              Question {currentIndex + 1} of {questions.length}
            </p>
            <h3 className="text-xl md:text-2xl font-bold text-blue-300 mb-6">
              {questions[currentIndex]}
            </h3>

            {/* Timer */}
            <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden mb-2">
              <div
                className="absolute top-0 left-0 h-full bg-yellow-400 transition-all duration-1000 ease-linear"
                style={{ width: `${(timer / 60) * 100}%` }}
              ></div>
            </div>
            <div className="text-sm text-yellow-300 text-right mb-6">
              ⏱️ {timer}s remaining
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => handleNext(true)}
                className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-full text-white font-semibold transition-all duration-300"
              >
                Skip
              </button>
              <button
                onClick={() => handleNext(false)}
                className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full text-white font-semibold transition-all duration-300"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-gray-400 italic">
          💡 Tip: Answer naturally. Maintain eye contact, and speak clearly and confidently.
        </div>
      </div>
    </div>
  );
};

export default StartInterview;
