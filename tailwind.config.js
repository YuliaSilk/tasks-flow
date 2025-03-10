/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  "./public/index.html",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1440px",
        xl: "1920px",
      },
      colors: {
        primary: {
          light: "#255DC1",
          dark: "#B3ABF9",
        },
        background: {
          light: "#FDFFFC",
          dark: "#050e1a",
        },
        secondary: {
          light: "#bc00dd",
          dark: "#9e019e", 
        },
        accent: {
          light: "#e802a3",
          dark: "#fd14b6",
        },
        text: {
          light: "#000229",
          dark: "#d7d9ff"
        },
        error: {
          light: "#d51950",
          dark: "#d51950",
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        dancing: ["Dancing Script", "cursive"],
      },
      fontSize: {
        xs: ["0.75rem", "0.85rem"],
        sm: ["0.875rem", "1.25rem"],
        base: ["1rem", "1.5rem"],
        lg: ["1.125rem", "1.75rem"],
        xl: ["1.25rem", "2rem"],
        "2xl": ["1.5rem", "2.25rem"],
        "3xl": ["1.875rem", "2.625rem"],
        "4xl": ["2.25rem", "3rem"],
        "5xl": ["3rem", "3.75rem"],
        "6xl": ["3.75rem", "4.5rem"],
      },
      boxShadow: {
        "main-shadow": "0px 5px 15px 0px rgba(0, 0, 0, 0.35)",
        "card-shadow": "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      },
    },
  },
  plugins: [],
};