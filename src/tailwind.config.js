/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/app/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
          deep:  "#3B2418",
          mid:   "#6B4530",
          light: "#A9826A",
        },
        beige: {
          warm: "#F7F1E8",
          mid:  "#EDE0CC",
          dark: "#D2B48C",
        },
        cream: "#FDFBF7",
      },
      fontFamily: {
        heading: ["var(--font-cormorant)", "Georgia", "serif"],
        body: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        soft: "0 2px 20px rgba(59,36,24,0.08)",
        card: "0 4px 30px rgba(59,36,24,0.12)",
        warm: "0 8px 40px rgba(59,36,24,0.18)",
      },
    },
  },
  plugins: [],
};