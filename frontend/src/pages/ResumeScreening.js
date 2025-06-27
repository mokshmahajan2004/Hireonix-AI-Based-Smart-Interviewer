// Enhanced ResumeScreening with skill keyword highlighter and dynamic job role insertion
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Upload, FileText, BarChart3 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import ResultCard from "../components/ResultCard";
import sampleJobRolesData from "../data/sampleJobRolesData"; // dynamic job data
import BulletRewriter from "../components/BulletRewritter";

const ResumeScreening = () => {
  const [step, setStep] = useState(1);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobDesc, setJobDesc] = useState("");
  const [resumeText, setResumeText] = useState("React Git REST APIs Firebase Agile Node.js");
  const [matchedKeywords, setMatchedKeywords] = useState([]);
  const [missingKeywords, setMissingKeywords] = useState([]);
  const [rewrites, setRewrites] = useState([]);


  
const [llmSections, setLlmSections] = useState({
  matchScore: "",
  missingSkills: [],
  improvementTips: [],
  summary: "",
  bulletRewrites: [], // 🔥 new field
});

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setResume(file);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 2500);
  };

  const extractKeywords = (text, topN = 20) => {
    const words = text.toLowerCase().match(/\b(\w+)\b/g)?.filter((word) => word.length > 3) || [];
    const freq = {};
    words.forEach((w) => (freq[w] = (freq[w] || 0) + 1));
    return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, topN).map(([word]) => word);
  };
const compareSkills = () => {
  const keywords = extractKeywords(jobDesc);
  const resumeWords = resumeText.toLowerCase();
  const matched = [];
  const missing = [];

  keywords.forEach((word) => {
    if (resumeWords.includes(word)) matched.push(word);
    else missing.push(word);
  });

  setMatchedKeywords(matched);
  setMissingKeywords(missing);

  // ✅ LLM-like mocked result
  setLlmSections({
    matchScore: "88/100 - Strong technical match, but lacks some preferred skills.",
    missingSkills: ["Git", "Figma", "RESTful APIs"],
    improvementTips: [
      "Add version control tools like Git.",
      "Mention exposure to RESTful APIs.",
      "Include familiarity with design tools like Figma or Adobe XD.",
    ],
    summary:
      "Your resume is technically strong and well-aligned for frontend roles. To further improve, focus on adding missing skills and quantifiable achievements.",
  });

  // ✅ Set bullet rewrites
  setRewrites([
    {
      original: "Used Flask APIs and React UI to achieve 92% accuracy in CNN-based landmark identification.",
      improved: "**Improved:** Leveraged Flask APIs and React UI to drive a 92% accuracy rate in CNN-based landmark identification.",
      showImproved: false,
    },
    {
      original: "Collaborated with cross-functional teams to ensure timely and high-quality project delivery.",
      improved: "**Improved:** Partnered with cross-functional teams to deliver high-impact solutions on time with exceptional quality.",
      showImproved: false,
    },
  ]);
};




  const highlightText = (text, matched, missing) => {
    const allWords = [...matched, ...missing].sort((a, b) => b.length - a.length);
    let highlighted = text;
    allWords.forEach((word) => {
      const color = matched.includes(word) ? "#4ade80" : "#f87171";
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      highlighted = highlighted.replace(regex, `<mark style="background:${color}; padding:2px 4px; border-radius:4px">${word}</mark>`);
    });
    return highlighted;
  };

  const StepIndicator = () => {
    const steps = [
      { number: 1, label: "Upload Resume", icon: <Upload size={18} /> },
      { number: 2, label: "Add Job Description", icon: <FileText size={18} /> },
      { number: 3, label: "View Results", icon: <BarChart3 size={18} /> },
    ];
    return (
      <div className="flex justify-center items-center gap-8 mb-12 mt-6 px-4 flex-wrap">
        {steps.map((stepItem, index) => (
          <div
            key={index}
            className="flex items-center relative cursor-pointer group"
            onClick={() => stepItem.number < step && setStep(stepItem.number)}
          >
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-sm md:text-lg font-bold z-10 transition-all duration-300 ${step === stepItem.number ? "bg-yellow-400 text-black shadow-xl ring-4 ring-yellow-300" : step > stepItem.number ? "bg-green-500 text-white" : "border-2 border-gray-500 text-white bg-[#1e293b]"}`}>{step > stepItem.number ? <Check size={18} /> : stepItem.icon}</div>
              <p className={`mt-2 text-xs md:text-sm text-center font-medium w-24 md:w-32 transition-colors duration-200 ${step === stepItem.number ? "text-white" : "text-gray-400 group-hover:text-yellow-300"}`}>{stepItem.label}</p>
            </div>
            {index < steps.length - 1 && <div className="hidden sm:block w-10 md:w-16 h-1 bg-gray-600 mx-2 mt-1 relative"><div className={`absolute top-0 left-0 h-full transition-all duration-300 ${step > stepItem.number ? "bg-yellow-400 w-full" : "bg-gray-600 w-0"}`}></div></div>}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white">
    <Sidebar />
<main className="flex-1 transition-all duration-300 ml-16 group-hover:ml-56 px-4 sm:px-6 pt-24 pb-16 bg-[#020617] max-w-full md:max-w-[calc(100%-4rem)] mx-auto">
    <div className="min-h-screen bg-[#020617] text-white px-4 py-12 font-sans relative">
      <div className="fixed top-0 left-0 h-1 bg-yellow-400 z-50 transition-all duration-500" style={{ width: `${(step - 1) * 50}%` }} />
      <section className="text-center px-6 pt-16 pb-14 max-w-6xl mx-auto relative">
  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-transparent to-yellow-400/10 blur-2xl pointer-events-none"></div>
  
  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-yellow-400 mb-6 leading-tight drop-shadow-sm">
    Supercharge Your Resume with AI
  </h1>
  
  <p className="text-gray-300 text-lg sm:text-xl max-w-3xl mx-auto leading-relaxed">
    Leverage advanced AI to align your resume with top job descriptions and boost your chances of clearing any ATS (Applicant Tracking System). Let your resume speak the language recruiters understand.
  </p>

  <div className="mt-8 flex justify-center">
    <button className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg shadow-md transition duration-300">
      Get Started
    </button>
  </div>
</section>

      <StepIndicator />
      <AnimatePresence mode="wait">
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.5 }} className="max-w-6xl mx-auto px-4 sm:px-6 mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <ResultCard title="🎯 Match Score" content={llmSections.matchScore} />
                <ResultCard title="❌ Critical Missing Skills" content={llmSections.missingSkills} />
                <ResultCard title="🧠 How the Candidate Can Improve" content={llmSections.improvementTips} />
                <ResultCard title="💡 Additional Feedback" content={llmSections.summary} />
              </div>
              {rewrites.length > 0 && (
                <div className="mt-10 bg-[#0f172a] border border-yellow-400 rounded-xl p-6">
                  <h2 className="text-xl font-semibold text-yellow-400 mb-4 text-center">✍ Resume Bullet Enhancements</h2>
                  <BulletRewriter bullets={rewrites} setBullets={setRewrites} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
    </div>
        </main>
  </div>
  );
};

export default ResumeScreening;