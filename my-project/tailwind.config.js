/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
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
