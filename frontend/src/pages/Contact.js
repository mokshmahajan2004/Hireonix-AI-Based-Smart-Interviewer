/** Contact Page */
import React, { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const reviews = [
  {
    name: "Sameer Khan",
    role: "Frontend Candidate",
    review: "The AI feedback was really useful! Helped me realize I talk too fast.",
    rating: 4,
  },
  {
    name: "Gursimran Singh",
    role: "Backend Engineer",
    review: "I liked how realistic the mock interview felt. Just like a real round.",
    rating: 5,
  },
  {
    name: "Soumya Bari",
    role: "Graduate Applicant",
    review: "Resume feedback was detailed. I updated mine and got more callbacks!",
    rating: 4,
  },
  {
    name: "Ananya Gupta",
    role: "Data Science Enthusiast",
    review: "Loved the personalized suggestions after each answer. Very smart system!",
    rating: 5,
  },
  {
    name: "Ravi Mehra",
    role: "AI/ML Intern",
    review: "Mock interview helped me crack my summer internship! Super useful!",
    rating: 5,
  },
  {
    name: "Niharika Rao",
    role: "Software Developer",
    review: "Very intuitive platform. The instant feedback really stands out.",
    rating: 4,
  },
];

const Contact = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft += 1;
        if (
          scrollRef.current.scrollLeft >=
          scrollRef.current.scrollWidth - scrollRef.current.clientWidth
        ) {
          scrollRef.current.scrollLeft = 0;
        }
      }
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#020617] text-white min-h-screen font-sans pt-12">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-[#0f172a] p-8 rounded-xl shadow-lg space-y-10 border border-gray-700">
            <div>
              <h3 className="text-xl font-bold mb-1">💬 Chat with us</h3>
              <p className="text-gray-400">Our friendly team is here to help.</p>
              <p className="text-yellow-300 mt-1">support@hireonix.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">🌍 Visit us</h3>
              <p className="text-gray-400">221B Developer Street, Noida</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">📞 Call us</h3>
              <p className="text-gray-400">+91 98765 43210</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#0f172a] p-8 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">Let’s talk.</h2>
            <p className="text-gray-400 mb-6 text-sm md:text-base">
              Tell us a bit about yourself and what you need help with.
            </p>
            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-3 rounded-md bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-3 rounded-md bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 rounded-md bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-3 rounded-md bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-3 rounded-md bg-[#1e293b] text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
              <button
                type="submit"
                className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded-md hover:bg-yellow-500 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-10">Reviews from other learners</h2>
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden whitespace-nowrap px-1"
          >
            {reviews.map((r, i) => (
              <div
                key={i}
                className="bg-[#0f172a] p-6 rounded-lg shadow-md border border-gray-700 min-w-[300px] max-w-[300px] h-fit"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src="https://placehold.co/48x48"
                    alt={r.name}
                    className="rounded-full w-12 h-12 object-cover"
                  />
                  <div className="truncate">
                    <h4 className="font-semibold text-white text-sm truncate">{r.name}</h4>
                    <p className="text-gray-400 text-xs truncate">{r.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mb-4 line-clamp-4">{r.review}</p>
                <p className="text-yellow-400 font-semibold text-sm">
                  {r.rating.toFixed(1)} ★ {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
