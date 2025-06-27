// components/Loader.js
import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-400 mb-6"></div>
      <h2 className="text-2xl font-semibold text-yellow-400 mb-2">Analyzing Resume...</h2>
      <p className="text-gray-400 max-w-md">
        Our AI is carefully reading your resume and job description to generate meaningful insights tailored to the role.
      </p>
    </div>
  );
};

export default Loader;
