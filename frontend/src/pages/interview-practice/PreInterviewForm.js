import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

    axios
      .post("http://localhost:8000/generate-questions/", savedData)
      .then((res) => {
        const questions = res.data.questions;
        localStorage.setItem("interviewQuestions", JSON.stringify(questions));
        localStorage.setItem("interviewProfile", JSON.stringify(savedData));
        navigate("/start-interview");
      })
      .catch((err) => {
        console.error("Error generating questions", err);
        alert("Failed to generate questions. Try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] px-4 py-12 flex items-center justify-center text-white font-sans">
      <div className="w-full max-w-3xl bg-[#1e293b] border border-blue-800 rounded-3xl shadow-2xl p-10">
        <h2 className="text-4xl font-extrabold text-center text-blue-400 mb-3">
          📝 Pre-Interview Details
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          Provide your background so we can tailor the interview experience to
          you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name (optional)"
            value={formData.name}
            onChange={handleChange}
            className="bg-[#0f172a] border border-gray-600 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

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
              className={`bg-[#0f172a] border ${
                errors.email ? "border-red-500" : "border-gray-600"
              } p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
                    setActiveRoleIndex((prev) => (prev + 1) % filtered.length);
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
                className={`bg-[#0f172a] border ${
                  errors.role ? "border-red-500" : "border-gray-600"
                } p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
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
          <div>
            <label className="block text-sm mb-1 text-gray-400">
              Key Skills <span className="text-red-500">*</span>
            </label>
            <div
              className={`flex flex-wrap items-center gap-2 bg-[#0f172a] border ${
                errors.skills ? "border-red-500" : "border-gray-600"
              } rounded-md px-3 py-2 relative`}
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
                    setActiveSkillIndex((prev) => (prev + 1) % filtered.length);
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
              {skillInput && (
                <ul className="absolute top-full left-0 right-0 bg-[#0f172a] border border-gray-700 rounded-md mt-2 max-h-40 overflow-auto z-10">
                  {skillSuggestions
                    .filter(
                      (sugg) =>
                        sugg.toLowerCase().includes(skillInput.toLowerCase()) &&
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
          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g. 2 years in DevOps)"
            value={formData.experience}
            onChange={handleChange}
            className="bg-[#0f172a] border border-gray-600 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="achievements"
            rows="3"
            placeholder="Achievements / Projects"
            value={formData.achievements}
            onChange={handleChange}
            className="bg-[#0f172a] border border-gray-600 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <textarea
            name="notes"
            rows="2"
            placeholder="Any other notes you'd like us to consider..."
            value={formData.notes}
            onChange={handleChange}
            className="bg-[#0f172a] border border-gray-600 p-3 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-all"
          >
            Start Interview 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default PreInterviewForm;
