import React from 'react';
import img1 from '../../assets/img1.webp';
import img2 from '../../assets/img2.webp';
import img3 from '../../assets/img3.webp';

const AboutPage = () => {
  return (
    <div className="w-full bg-[#020617] text-white px-6 pt-24 pb-24">
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Empowering Interview Preparation with <span className="text-cyan-400">AI Innovation</span>
        </h3>
        <p className="text-gray-400 text-lg">
          AI Interview is designed to revolutionize how learners, job seekers, and professionals prepare for interviews
          through smart, personalized, and interactive experiences driven by artificial intelligence.
        </p>
      </div>

      {/* Image Section */}
      <div className="flex flex-col md:flex-row justify-center gap-8 mb-20">
        <img
          src={img1}
          alt="Interview Practice"
          className="w-full md:w-1/4 rounded-2xl shadow-xl"
        />
        <img
          src={img2}
          alt="AI Analysis"
          className="w-full md:w-1/4 rounded-2xl shadow-xl"
        />
        <img
          src={img3}
          alt="Confidence Building"
          className="w-full md:w-1/4 rounded-2xl shadow-xl"
        />
      </div>

      {/* Why AI Interview Section */}
      <div className="text-center max-w-4xl mx-auto mb-24">
        <h2 className="text-3xl font-bold text-white mb-6">
          Why <span className="text-blue-400">AI Interview</span>?
        </h2>
        <p className="text-lg text-gray-300 mb-4">
          We combine <span className="text-teal-400 font-semibold">intelligent questioning</span>, real-time
          <span className="text-purple-400 font-semibold"> feedback</span>, and personalized
          <span className="text-yellow-400 font-semibold"> improvement plans</span> to help you boost your confidence
          and performance in interviews.
        </p>
        <p className="text-lg text-gray-400">
          Whether you're a student, job switcher, or working professional, our AI-driven mock interviews, skill
          recommendations, and analytics dashboard ensure you're always a step ahead.
        </p>
      </div>

      {/* Divider Line */}
      <div className="border-t border-gray-700 w-full mb-20"></div>

      {/* Vision & Mission Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 px-4 md:px-0">
        {/* Vision */}
        <div className="bg-[#0f172a] p-8 rounded-xl shadow-lg transition hover:scale-[1.02] duration-300">
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">Our Vision</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            To become the world’s most trusted AI-powered interview preparation platform — where confidence meets
            technology, and every candidate has a fair shot at success.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-[#0f172a] p-8 rounded-xl shadow-lg transition hover:scale-[1.02] duration-300">
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">Our Mission</h3>
          <p className="text-gray-300 text-lg leading-relaxed">
            To empower individuals by simulating real interview experiences, providing intelligent feedback, and
            crafting personalized growth paths using advanced AI tools.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
