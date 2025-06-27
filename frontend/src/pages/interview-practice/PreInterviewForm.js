import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/animations/yellow.json"; // ✅ Update if your path is different
import Sidebar from "../../components/Sidebar";

const PreInterviewForm = () => {
  const navigate = useNavigate();

  const skillSuggestions = [
    "Java",
    "Spring MVC",
    "MySQL",
    "GIT",
    "Hibernate",
    "JavaScript",
    "HTML",
    "REST",
    "Thymeleaf",
    "CSS",
    "JWT security",
    "Gradle",
    "Bootstrap",
    "jQuery",
    "Postman",
  ];

  const roleSuggestions = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Analyst",
    "Data Scientist",
    "ML Engineer",
    "DevOps Engineer",
    "Software Tester",
    "System Administrator",
    "UI/UX Designer",
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: [],
    experience: "",
    achievements: "",
    notes: "",
  });

  const [roleInput, setRoleInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [activeRoleIndex, setActiveRoleIndex] = useState(-1);
  const [activeSkillIndex, setActiveSkillIndex] = useState(-1);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!roleInput.trim()) newErrors.role = "Please enter your desired role.";
    if (formData.skills.length === 0)
      newErrors.skills = "Add at least one skill.";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const savedData = {
      ...formData,
      role: roleInput,
      skills: formData.skills.join(", "),
    };

    setIsLoading(true); // ✅ show loader

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/generate-questions/`,
        savedData
      )
      .then((res) => {
        const questions = res.data.questions;
        localStorage.setItem("interviewQuestions", JSON.stringify(questions));
        localStorage.setItem("interviewProfile", JSON.stringify(savedData));
        navigate("/start-interview");
      })
      .catch((err) => {
        console.error("Error generating questions", err);
        alert("Failed to generate questions. Try again.");
      })
      .finally(() => {
        setIsLoading(false); // stop loading if there's an error
      });
  };

  // ✅ Show beautiful Lottie loader while generating questions
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white">
        <Lottie
          animationData={loaderAnimation}
          loop={true}
          className="w-72 h-72"
        />
        <p className="text-lg text-white-500 mt-[-40px]">
          Generating your interview questions...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#020617] text-white font-sans group">
      <Sidebar />
      <main className="w-full sm:ml-16 transition-all duration-300 px-4 sm:px-6 py-16 flex justify-center">
        <div className="w-full max-w-[70rem] mx-auto bg-[#0f172a] rounded-3xl border border-gray-700 shadow-2xl p-6 sm:p-10">
          <h2 className="text-4xl font-extrabold text-center text-yellow-400 mb-2">
            📝 Pre-Interview Details
          </h2>
          <p className="text-center text-gray-400 mb-10 text-sm">
            Provide your background so we can tailor the interview experience to
            you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm mb-1 text-gray-400">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-[#1e293b] border border-gray-600 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1 text-gray-400">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`bg-[#1e293b] border ${
                  errors.email ? "border-red-500" : "border-gray-600"
                } p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Role Input */}
            <div>
              <label className="block text-sm mb-1 text-gray-400">
                Role <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={roleInput}
                  onChange={(e) => {
                    setRoleInput(e.target.value);
                    setActiveRoleIndex(-1);
                    setErrors((prev) => ({ ...prev, role: "" }));
                  }}
                  onKeyDown={(e) => {
                    const filtered = roleSuggestions.filter((r) =>
                      r.toLowerCase().includes(roleInput.toLowerCase())
                    );
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setActiveRoleIndex(
                        (prev) => (prev + 1) % filtered.length
                      );
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setActiveRoleIndex((prev) =>
                        prev <= 0 ? filtered.length - 1 : prev - 1
                      );
                    } else if (e.key === "Enter" && activeRoleIndex >= 0) {
                      e.preventDefault();
                      const selected = filtered[activeRoleIndex];
                      setRoleInput(selected);
                      setActiveRoleIndex(-2);
                      setErrors((prev) => ({ ...prev, role: "" }));
                    }
                  }}
                  placeholder="Role you're preparing for"
                  className={`bg-[#1e293b] border ${
                    errors.email ? "border-red-500" : "border-gray-600"
                  } p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400`}
                />
                {errors.role && (
                  <p className="text-red-400 text-sm mt-1">{errors.role}</p>
                )}
                {roleInput && activeRoleIndex !== -2 && (
                  <ul className="absolute top-full left-0 right-0 bg-[#0f172a] border border-gray-700 rounded-md mt-1 max-h-40 overflow-auto z-10">
                    {roleSuggestions
                      .filter((r) =>
                        r.toLowerCase().includes(roleInput.toLowerCase())
                      )
                      .map((r, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setRoleInput(r);
                            setActiveRoleIndex(-2);
                            setErrors((prev) => ({ ...prev, role: "" }));
                          }}
                          className={`px-4 py-2 cursor-pointer text-sm ${
                            index === activeRoleIndex
                              ? "bg-blue-800 text-white"
                              : "hover:bg-blue-700"
                          }`}
                        >
                          {r}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>

            {/* ✅ SKILLS INPUT */}
            <div className="space-y-1">
              <label className="block text-sm mb-1 text-gray-400">
                Key Skills <span className="text-red-500">*</span>
              </label>
              <div
                className={`flex flex-wrap items-center gap-2 bg-[#1e293b] border ${
                  errors.skills ? "border-red-500" : "border-gray-600"
                } rounded-md px-3 py-2 relative focus-within:ring-2 focus-within:ring-blue-500`}
              >
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-600 text-white px-3 py-1 text-sm rounded-full flex items-center gap-2"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          skills: prev.skills.filter((_, i) => i !== index),
                        }));
                        setErrors((prev) => ({ ...prev, skills: "" }));
                      }}
                      className="text-white hover:text-yellow-300 text-xs"
                    >
                      ✕
                    </button>
                  </span>
                ))}

                {/* Skill typing input */}
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => {
                    setSkillInput(e.target.value);
                    setActiveSkillIndex(-1);
                    setErrors((prev) => ({ ...prev, skills: "" }));
                  }}
                  onKeyDown={(e) => {
                    const filtered = skillSuggestions.filter(
                      (s) =>
                        s.toLowerCase().includes(skillInput.toLowerCase()) &&
                        !formData.skills.includes(s)
                    );
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setActiveSkillIndex(
                        (prev) => (prev + 1) % filtered.length
                      );
                    } else if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setActiveSkillIndex((prev) =>
                        prev <= 0 ? filtered.length - 1 : prev - 1
                      );
                    } else if (e.key === "Enter" && activeSkillIndex >= 0) {
                      e.preventDefault();
                      const selected = filtered[activeSkillIndex];
                      setFormData((prev) => ({
                        ...prev,
                        skills: [...prev.skills, selected],
                      }));
                      setSkillInput("");
                      setActiveSkillIndex(-1);
                      setErrors((prev) => ({ ...prev, skills: "" }));
                    } else if (
                      (e.key === "Enter" || e.key === ",") &&
                      skillInput.trim()
                    ) {
                      e.preventDefault();
                      const newSkill = skillInput.trim();
                      if (!formData.skills.includes(newSkill)) {
                        setFormData((prev) => ({
                          ...prev,
                          skills: [...prev.skills, newSkill],
                        }));
                      }
                      setSkillInput("");
                      setActiveSkillIndex(-1);
                      setErrors((prev) => ({ ...prev, skills: "" }));
                    }
                  }}
                  placeholder="Type a skill and press Enter"
                  className="bg-transparent flex-1 text-sm p-1 outline-none text-white placeholder-gray-500"
                />

                {/* Suggestion dropdown */}
                {skillInput && (
                  <ul className="absolute top-full left-0 right-0 bg-[#1e293b] border border-gray-700 rounded-md mt-2 max-h-40 overflow-auto z-10">
                    {skillSuggestions
                      .filter(
                        (sugg) =>
                          sugg
                            .toLowerCase()
                            .includes(skillInput.toLowerCase()) &&
                          !formData.skills.includes(sugg)
                      )
                      .map((sugg, index) => (
                        <li
                          key={index}
                          className={`px-4 py-2 cursor-pointer text-sm ${
                            index === activeSkillIndex
                              ? "bg-blue-800 text-white"
                              : "hover:bg-blue-700"
                          }`}
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              skills: [...prev.skills, sugg],
                            }));
                            setSkillInput("");
                            setActiveSkillIndex(-1);
                            setErrors((prev) => ({ ...prev, skills: "" }));
                          }}
                        >
                          {sugg}
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              {errors.skills && (
                <p className="text-red-400 text-sm mt-1">{errors.skills}</p>
              )}
            </div>

            {/* Experience, Achievements, Notes */}
            {/* Experience */}
            <div>
              <label className="block text-sm mb-1 text-gray-400">
                Experience
              </label>
              <input
                type="text"
                name="experience"
                placeholder="Experience (e.g. 2 years in DevOps)"
                value={formData.experience}
                onChange={handleChange}
                className="bg-[#1e293b] border border-gray-600 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              />
            </div>

            {/* Achievements */}
            <div>
              <label className="block text-sm mb-1 text-gray-400">
                Achievements / Projects
              </label>
              <textarea
                name="achievements"
                rows="3"
                placeholder="Achievements or noteworthy projects"
                value={formData.achievements}
                onChange={handleChange}
                className="bg-[#1e293b] border border-gray-600 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-400">
                Additional Notes
              </label>
              <textarea
                name="notes"
                rows="2"
                placeholder="Any other notes you'd like us to consider..."
                value={formData.notes}
                onChange={handleChange}
                className="bg-[#1e293b] border border-gray-600 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg text-lg transition-all duration-300"
            >
              Start Interview 🚀
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default PreInterviewForm;
