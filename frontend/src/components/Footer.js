import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white py-12 px-6 mt-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-bold mb-2">Hireonix</h3>
          <p className="text-sm text-gray-400">
            Your AI-powered companion for mock interviews, resume evaluation, and skill tracking.
          </p>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li><a href="#hero" className="hover:text-yellow-400">Home</a></li>
            <li><a href="/about" className="hover:text-yellow-400">About</a></li>
            <li><a href="/services" className="hover:text-yellow-400">Services</a></li>
            <li><a href="/login" className="hover:text-yellow-400">Login</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2">Contact</h4>
          <p className="text-sm text-gray-300">Email: support@hireonix.com</p>
          <p className="text-sm text-gray-300">Phone: +91 98765 43210</p>
        </div>
        <div>
          <h4 className="text-md font-semibold mb-2">Follow Us</h4>
          <div className="flex space-x-4 text-sm text-gray-300">
            <a href="#" className="hover:text-yellow-400">LinkedIn</a>
            <a href="#" className="hover:text-yellow-400">Twitter</a>
            <a href="#" className="hover:text-yellow-400">Instagram</a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} Hireonix. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
