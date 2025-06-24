import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-[#0f172a] text-white pt-32 pb-36 overflow-hidden">
      {/* --- Top Wave Shape --- */}
      <div className="absolute top-0 left-0 w-full z-0">
        <svg
          className="w-full h-[120px]"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#0f172a"
            d="M0,256L60,234.7C120,213,240,171,360,144C480,117,600,107,720,133.3C840,160,960,224,1080,240C1200,256,1320,224,1380,208L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          />
        </svg>
      </div>

      {/* --- Bottom Arc SVG --- */}
      <div className="absolute bottom-0 left-0 w-full z-0 animate-fade">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-[100px] rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path d="M0,96 C480,0 960,0 1440,96 L1440,0 L0,0 Z" fill="#0f172a" />
        </svg>
      </div>

      {/* --- Background Watermark Brand --- */}
      <h1 className="absolute bottom-6 left-6 text-[120px] md:text-[160px] font-extrabold text-white/5 select-none pointer-events-none z-0 leading-none animate-fade">
        Hireonix
      </h1>

      {/* --- Footer Content --- */}
      <div className="max-w-5xl mx-auto text-center px-6 z-10 relative">
        <h2 className="text-4xl font-extrabold text-yellow-400 mb-2 tracking-tight">
          Hireonix
        </h2>

        <p className="text-xl font-medium text-white mb-3">
          Upgrade Your Interview & Resume Experience
        </p>

        <p className="text-gray-400 text-sm max-w-2xl mx-auto mb-6 leading-relaxed">
          Join our AI-powered platform for mock interviews, resume screening,
          and actionable insights. Be among the first to access exclusive tools
          and features tailored to you.
        </p>

        <button className="bg-yellow-400 text-black font-bold px-8 py-3 rounded-full shadow-md hover:bg-yellow-300 transition duration-300">
          Get Early Access
        </button>

        {/* Social Icons – use buttons or external URLs */}
        <div className="flex justify-center gap-5 mt-8 text-gray-400">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 hover:text-yellow-400 transition" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <Twitter className="w-6 h-6 hover:text-yellow-400 transition" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <Instagram className="w-6 h-6 hover:text-yellow-400 transition" />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <Facebook className="w-6 h-6 hover:text-yellow-400 transition" />
          </a>
        </div>

        {/* Footer Links */}
        <div className="mt-8 flex justify-center flex-wrap gap-8 text-sm text-gray-500 font-medium">
          <a href="/privacy" className="hover:text-yellow-400 transition">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-yellow-400 transition">
            Terms & Conditions
          </a>
          <a href="/contact" className="hover:text-yellow-400 transition">
            Contact Us
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-600 mt-6">
          © {new Date().getFullYear()}{" "}
          <span className="text-yellow-400 font-semibold">Hireonix</span>. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
