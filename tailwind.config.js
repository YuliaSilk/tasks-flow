/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1440px",
        xl: "1920px",
      },
      colors: {
        primary:{
          main: '#030637',
          secondary: '#3C0753',
          tertiary: '#720455',
          accent:'#910A67',
          text: '#2E2E2E',
          red: '#d51950',
        }
        
      },
      boxShadow: {
        "main-shadow": "0px 5px 15px 0px rgba(0, 0, 0, 0.35)",
        "card-shadow": "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }

    },
  },
  plugins: [],
}

