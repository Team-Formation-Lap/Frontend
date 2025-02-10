/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    inset: {
      120: "30rem", // 480px
    },
    extend: {
      fontFamily: {
        museo: ["MuseoModerno", "sans-serif"],
      },
    },
  },
  plugins: [],
};
