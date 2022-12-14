/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        link: "#A6B0C3FF",
        hover: "#FF0080",
        secondary: "#FFFFFFB3",
      },
    },
  },
  plugins: [],
};
