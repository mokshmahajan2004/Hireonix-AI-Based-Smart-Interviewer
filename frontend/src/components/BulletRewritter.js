// src/components/BulletRewriter.js
import React from "react";

const BulletRewriter = ({ bullets = [], setBullets }) => {
  const toggleImproved = (index) => {
    setBullets((prev) =>
      prev.map((b, i) => (i === index ? { ...b, showImproved: !b.showImproved } : b))
    );
  };

  return (
    <div className="mt-16 bg-[#0f172a] border border-yellow-400 rounded-xl p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-yellow-400 mb-6">✍ AI Bullet Rewriter</h3>
      {bullets.map((item, index) => (
        <div key={index} className="mb-6">
          <p className="text-white text-base">• {item.original}</p>
          <button
            className="mt-2 px-4 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-black rounded"
            onClick={() => toggleImproved(index)}
          >
            {item.showImproved ? "Hide Improved Line" : "✍ Improve this line"}
          </button>
          {item.showImproved && (
            <div className="mt-2 text-green-300 text-sm">
              <span className="font-semibold">💡 Improved:</span> {item.improved}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BulletRewriter;
