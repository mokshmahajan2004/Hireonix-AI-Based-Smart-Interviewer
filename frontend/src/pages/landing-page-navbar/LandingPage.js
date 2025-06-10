import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Config"; // Adjust if the path is different
import aiVideo from "../../assets/ai.mp4";
import { motion } from "framer-motion";
import testimonialImage from "../../assets/testimonial.png";

const block1 = [
  'import React from "react";',
  'import InterviewBot from "./InterviewBot";',
  'import Feedback from "./Feedback";',
  "",
  "function App() {",
  "  return (",
  "    <div>",
  "      <InterviewBot />",
  "      <Feedback />",
  "    </div>",
  "  );",
  "}",
];

const block2 = [
  "const feedback = {",
  '  confidence: "4.5 / 5",',
  '  fluency: "Excellent",',
  '  clarity: "Good",',
  '  suggestion: "Summarize better."',
  "};",
  "",
  "console.log(feedback);",
];

const LandingPage = () => {
  const navigate = useNavigate();

  const [typedBlock1, setTypedBlock1] = useState([]);
  const [typedBlock2, setTypedBlock2] = useState([]);
  const [loopCount, setLoopCount] = useState(0);

  // Loop Block 1
useEffect(() => {
  let i = 0;
  const typeBlock1 = () => {
    if (i < block1.length) {
      setTypedBlock1((prev) => [...prev, block1[i]]);
      i++;
      setTimeout(typeBlock1, 200);
    } else {
      setTimeout(() => {
        typeBlock2(); // trigger block2 only after block1
      }, 500);
    }
  };
  const typeBlock2 = () => {
    let j = 0;
    const loopBlock2 = () => {
      if (j < block2.length) {
        setTypedBlock2((prev) => [...prev, block2[j]]);
        j++;
        setTimeout(loopBlock2, 200);
      } else {
        setTimeout(() => {
          setTypedBlock1([]);
          setTypedBlock2([]);
          setLoopCount((prev) => prev + 1);
        }, 2000);
      }
    };
    loopBlock2();
  };

  typeBlock1();
}, [loopCount]);


  // Loop Block 2
  useEffect(() => {
    let j = 0;
    const typeBlock2 = () => {
      if (j < block2.length) {
        setTypedBlock2((prev) => [...prev, block2[j]]);
        j++;
        setTimeout(typeBlock2, 200);
      }
    };
    typeBlock2();
  }, [loopCount]);

  return (
    <div className="bg-[#020617] text-white font-sans pb-12">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight pt-20">
          Practice Smart.{" "}
          <span className="text-yellow-400">Perform Better.</span>
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mb-8">
          Ace your next interview with AI-powered mock interviews, instant
          feedback, and resume screening — designed for students, job seekers,
          and professionals.
        </p>

        <button
          onClick={() => {
            const user = auth.currentUser;
            if (user) {
              navigate("/dashboard");
            } else {
              navigate("/login");
            }
          }}
          className="bg-yellow-400 text-black px-8 py-4 rounded-xl font-semibold hover:bg-yellow-500 transition duration-300"
        >
          Get Started
        </button>

        {/* VIDEO SECTION */}
        <div className="mt-12 rounded-lg overflow-hidden shadow-2xl max-w-4xl w-full ring-4 ring-cyan-500/20">
          <video
  src={aiVideo}
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-auto object-cover"
>
  Your browser does not support the video tag.
</video>

        </div>
      </section>

      {/* ALTERNATING CODE SECTION */}
      <section className="px-6 md:px-16 mt-28 space-y-24">
        {/* Row 1: Text Left, Code Right */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h2 className="text-4xl font-bold mb-4">
              Boost your{" "}
              <span className="text-cyan-400">interview confidence</span>
            </h2>
            <p className="text-gray-400 mb-6">
              Train with real-time AI feedback, simulate technical rounds, and
              build skills from your browser.
            </p>
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition">
              Start Practicing →
            </button>
          </div>

          <div className="bg-[#0f172a] text-green-300 font-mono text-sm p-6 rounded-lg shadow-lg border border-gray-700 w-full min-h-[300px]">
            {typedBlock1.map((line, index) => (
              <div key={index} className="flex">
                <span className="w-6 text-gray-500">{index + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Code Left, Text Right */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div className="bg-[#0f172a] text-yellow-300 font-mono text-sm p-6 rounded-lg shadow-lg border border-gray-700 w-full min-h-[200px]">
            {typedBlock2.map((line, index) => (
              <div key={index} className="flex">
                <span className="w-6 text-gray-500">{index + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </div>

          <div className="md:pl-10">
            <h2 className="text-4xl font-bold mb-4">
              Real-time <span className="text-yellow-400">AI Feedback</span>
            </h2>
            <p className="text-gray-400 mb-6">
              Get detailed reports on clarity, fluency, confidence and receive
              smart suggestions after each interview round.
            </p>
            <button className="bg-gray-800 border border-gray-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-700 transition">
              Learn More →
            </button>
          </div>
        </div>
      </section>

      <section className="bg-[#020617] px-6 md:px-16 py-20">
  <h2 className="text-4xl font-bold text-center text-white mb-14">
    How <span className="text-yellow-400">It Works</span>
  </h2>

  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center">
    {/* Step 1 */}
    <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg hover:shadow-yellow-400/30 transition duration-300">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-yellow-500 text-black text-2xl mb-4 shadow-md">
        🧑‍💻
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Choose Your Role</h3>
      <p className="text-gray-400">
        Sign up as a student, job seeker, or fresher and select your interview goal.
      </p>
    </div>

    {/* Step 2 */}
    <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg hover:shadow-cyan-400/30 transition duration-300">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-cyan-500 text-black text-2xl mb-4 shadow-md">
        🎤
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Start Your Interview</h3>
      <p className="text-gray-400">
        Answer AI-powered questions in real-time using voice or text input.
      </p>
    </div>

    {/* Step 3 */}
    <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg hover:shadow-green-400/30 transition duration-300">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-green-400 text-black text-2xl mb-4 shadow-md">
        📊
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">Get Instant Report</h3>
      <p className="text-gray-400">
        Receive insights on confidence, fluency, clarity, and suggestions to improve.
      </p>
    </div>
  </div>
</section>

<section className="bg-[#020617] px-6 md:px-16 py-20">
  <h2 className="text-4xl font-bold text-center text-white mb-14">
    Hear from <span className="text-yellow-400">Our Users</span>
  </h2>

  <div className="max-w-4xl mx-auto space-y-10">
    {/* Testimonial 1 - Left bubble */}
    <div className="flex items-start space-x-4">
<img
  src={testimonialImage}
  alt="user"
  className="w-12 h-12 rounded-full border-2 border-yellow-400"
/>

      <div className="bg-[#0f172a] text-white p-4 rounded-2xl rounded-bl-none shadow-md w-full">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-yellow-400">Ananya Mehta</h4>
          <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
        </div>
        <p className="text-sm text-gray-300">
          The feedback was incredibly helpful! It felt like a real HR screening session.
        </p>
      </div>
    </div>

    {/* Testimonial 2 - Right bubble */}
    <div className="flex items-start justify-end space-x-4">
      <div className="bg-[#0f172a] text-white p-4 rounded-2xl rounded-br-none shadow-md w-full max-w-[85%]">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-cyan-400">Rohan Patel</h4>
          <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
        </div>
        <p className="text-sm text-gray-300">
          Loved the voice input feature and instant scoring! Made me feel confident before my real interviews.
        </p>
      </div>
<img
  src={testimonialImage}
  alt="user"
  className="w-12 h-12 rounded-full border-2 border-cyan-400"
/>

    </div>

    {/* Testimonial 3 - Left bubble */}
    <div className="flex items-start space-x-4">
<img
  src={testimonialImage}
  alt="user"
  className="w-12 h-12 rounded-full border-2 border-green-400"
/>

      <div className="bg-[#0f172a] text-white p-4 rounded-2xl rounded-bl-none shadow-md w-full">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-green-400">Priya Sinha</h4>
          <span className="text-yellow-400 text-sm">⭐⭐⭐⭐⭐</span>
        </div>
        <p className="text-sm text-gray-300">
          The report gave me insights on where I stutter and how I can improve — I’ve already cracked 2 interviews!
        </p>
      </div>
    </div>
  </div>
</section>



    </div>
  );
};

export default LandingPage;
