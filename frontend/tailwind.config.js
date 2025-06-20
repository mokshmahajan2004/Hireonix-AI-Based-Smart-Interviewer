module.exports = {
  darkMode: "class", // ✅ enables 'dark' class support
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
 theme: {
    extend: {
      animation: {
        fade: "fadeIn 1s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
