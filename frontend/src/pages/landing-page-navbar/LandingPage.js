import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../Config"; // Adjust if the path is different
import aiVideo from "../../assets/ai.mp4";
import TestimonialCard from "../../components/TestimonialCard";
import testimonials from "../../data/testimonialsData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


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

const settings = {
  autoplay: true,
  autoplaySpeed: 5000,
  infinite: true,
  dots: true,
  arrows: false,  // ✅ no custom arrows
  swipe: true,
  draggable: true,
  pauseOnHover: true,
};


  return (
    <div className="bg-[#020617] text-white font-sans pb-12">
      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-10">
    <h1
  className="font-extrabold mb-6 mt-16 leading-tight text-center"
  style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)" }}
>
  Practice Smart. <span className="text-yellow-400">Perform Better.</span>
</h1>

<p
  className="text-gray-300 max-w-2xl mb-8"
  style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)" }}
>          Ace your next interview with AI-powered mock interviews, instant
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
  className="w-full aspect-video object-cover"
/>

        </div>
      </section>

      {/* ALTERNATING CODE SECTION */}
      <section className="px-6 md:px-16 mt-28 space-y-24">
        {/* Row 1: Text Left, Code Right */}
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-start">
          <div>
<h2
  className="font-bold mb-4"
  style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
>              Boost your{" "}
              <span className="text-cyan-400">interview confidence</span>
            </h2>
            <p className="text-gray-400 mb-6">
              Train with real-time AI feedback, simulate technical rounds, and
              build skills from your browser.
            </p>
<button
  style={{
    fontSize: "clamp(0.875rem, 2vw, 1rem)",
    padding: "clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 3vw, 2rem)"
  }}
  className="bg-yellow-400 text-black rounded-xl font-semibold hover:bg-yellow-500 transition duration-300"
>              Start Practicing →
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
<h2
  className="font-bold mb-4"
  style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
>
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

      <section id="how-it-works" className="bg-[#020617] px-6 md:px-16 py-20">
  <h2 className="text-4xl font-bold text-center text-white mb-14">
    How <span className="text-yellow-400">It Works</span>
  </h2>

  <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 text-center">
    {/* Step 1 */}
    <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg hover:shadow-yellow-400/30 transition duration-300">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-yellow-500 text-black text-2xl mb-4 shadow-md">
        🧑‍💻
      </div>
     <h3
  className="font-semibold text-white mb-2"
  style={{ fontSize: "clamp(1rem, 2.8vw, 1.25rem)" }}
>
  Choose Your Role
</h3>
      <p className="text-gray-400">
        Sign up as a student, job seeker, or fresher and select your interview goal.
      </p>
    </div>

    {/* Step 2 */}
    <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg hover:shadow-cyan-400/30 transition duration-300">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-cyan-500 text-black text-2xl mb-4 shadow-md">
        🎤
      </div>
     <h3
  className="font-semibold text-white mb-2"
  style={{ fontSize: "clamp(1rem, 2.8vw, 1.25rem)" }}
>
  Start Your Interview
</h3>
      <p className="text-gray-400">
        Answer AI-powered questions in real-time using voice or text input.
      </p>
    </div>

    {/* Step 3 */}
    <div className="bg-[#0f172a] p-6 rounded-xl shadow-lg hover:shadow-green-400/30 transition duration-300">
      <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-green-400 text-black text-2xl mb-4 shadow-md">
        📊
      </div>
      <h3
  className="font-semibold text-white mb-2"
  style={{ fontSize: "clamp(1rem, 2.8vw, 1.25rem)" }}
>
  Get Instant Report
</h3>
      <p className="text-gray-400">
        Receive insights on confidence, fluency, clarity, and suggestions to improve.
      </p>
    </div>
  </div>
</section>

<section className="bg-[#020617] px-6 md:px-16 py-20">
 <h2
  className="font-bold text-center text-white mb-14"
  style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
>
  Hear from <span className="text-yellow-400">Our Users</span>
</h2>

  <div className="max-w-3xl mx-auto relative">
    <Slider {...settings}>
      {testimonials.map((testimonial, index) => (
        <div key={index}>
          <TestimonialCard {...testimonial} />
        </div>
      ))}
    </Slider>
  </div>
</section>


    </div>
  );
};

export default LandingPage;
