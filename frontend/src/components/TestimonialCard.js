import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";

const TestimonialCard = ({ name, color, rating, feedback, imagePosition = "left", image }) => {
  const isImageLeft = imagePosition === "left";
  const starCount = parseInt(rating.length); // ⭐⭐⭐⭐⭐ = 5

  return (
    <motion.div
      className={`flex items-start space-x-4 ${isImageLeft ? "" : "justify-end"}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {isImageLeft && (
        <img
          src={image}
          alt={name}
          className={`w-12 h-12 rounded-full border-2 border-${color}`}
        />
      )}

      <div
        className={`bg-[#0f172a] text-white p-4 rounded-2xl ${
          isImageLeft ? "rounded-bl-none" : "rounded-br-none"
        } shadow-md w-full ${isImageLeft ? "" : "max-w-[85%]"}`}
      >
        <div className="flex justify-between items-center mb-2">
          <h4 className={`font-semibold text-${color}`}>{name}</h4>
          <div className="flex space-x-1 text-yellow-400 text-sm">
            {[...Array(starCount)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
        </div>
        <p className="text-sm text-gray-300">{feedback}</p>
      </div>

      {!isImageLeft && (
        <img
          src={image}
          alt={name}
          className={`w-12 h-12 rounded-full border-2 border-${color}`}
        />
      )}
    </motion.div>
  );
};

export default TestimonialCard;
