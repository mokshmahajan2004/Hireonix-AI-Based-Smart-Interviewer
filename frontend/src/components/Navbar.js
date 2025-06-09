import { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#020617] text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold">🤖 Hireonix</h1>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 font-medium relative">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-400 transition">About Us</Link>

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-1 hover:text-yellow-400 transition"
            >
              Services
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isDropdownOpen ? 'rotate-180' : 'rotate-0'
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute top-10 left-0 bg-white text-black rounded-md shadow-lg py-2 w-44 z-20">
                <Link to="/resume" className="block px-4 py-2 hover:bg-gray-100">Resume Screening</Link>
                <Link to="/mock-interview" className="block px-4 py-2 hover:bg-gray-100">Mock Interview</Link>
                <Link to="/reports" className="block px-4 py-2 hover:bg-gray-100">Reports</Link>
              </div>
            )}
          </div>

          <Link to="/contact" className="hover:text-yellow-400 transition">Contact Us</Link>
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="border border-yellow-400 text-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Icon (Mobile) */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#020617] px-6 pb-4 pt-2 space-y-2 font-medium text-white">
          <Link to="/" className="block hover:text-yellow-400">Home</Link>
          <Link to="/about" className="block hover:text-yellow-400">About Us</Link>

          {/* Nested services */}
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer hover:text-yellow-400">
              <span>Services</span>
              <span className="group-open:rotate-180 transition-transform">⌄</span>
            </summary>
            <div className="pl-4 mt-2 space-y-1">
              <Link to="/resume" className="block hover:text-yellow-400">Resume Screening</Link>
              <Link to="/mock-interview" className="block hover:text-yellow-400">Mock Interview</Link>
              <Link to="/reports" className="block hover:text-yellow-400">Reports</Link>
            </div>
          </details>

          <Link to="/contact" className="block hover:text-yellow-400">Contact Us</Link>

          {/* Auth for mobile */}
          <div className="pt-2 space-y-2">
            <Link to="/login" className="block w-full text-center border border-yellow-400 text-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 hover:text-black transition">
              Login
            </Link>
            <Link to="/signup" className="block w-full text-center bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500 transition">
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
