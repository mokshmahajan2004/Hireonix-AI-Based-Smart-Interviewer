import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ResultCard = ({ title, icon, content }) => {
  return (
    <div className="bg-[#0f172a] border border-gray-700 rounded-xl p-6 mb-6 shadow-lg overflow-x-auto">
      <h3 className="text-xl font-bold text-yellow-400 mb-4">
        {icon} {title}
      </h3>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        className="prose prose-sm sm:prose md:prose-lg text-white max-w-none"
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default ResultCard;
