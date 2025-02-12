/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      width: {
        120: "30rem", // 480px
      },
      height: {
        120: "30rem", // 480px
      },
      inset: {
        120: "30rem",
      },
      fontFamily: {
        museo: ["MuseoModerno", "sans-serif"],
      },
    },
  },
  plugins: [],
};
