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
          light: "#144376",
          dark: "#89b9eb",
        },
        background: {
          light: "#e5eefa",
          dark: "#050e1a",
        },
        secondary: {
          light: "#fe62fe",
          dark: "#9e019e", // Fixed missing #
        },
        accent: {
          light: "#e802a3",
          dark: "#fd14b6",
        },
        text: {
          light: "#000229",
          dark: "#d7d9ff",
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
// module.exports = {
//   darkMode: "class", // або "media" для автоматичного визначення теми
//   theme: {
//     extend: {
//       colors: {
//         primary: {
//           light: "#144376",
//           dark: "#89b9eb",
//         },
//         background: {
//           light: "#e5eefa",
//           dark: "#050e1a",
//         },
//         text: {
//           light: "#000229",
//           dark: "#e5f1fa",
//         },
//       },
//     },
//   },
//   plugins: [],
// };
// :root[data-theme="light"] {
//   --text: #000229;
//   --background: #ebebff;
//   --primary: #010a7e;
//   --secondary: #fe62fe;
//   --accent: #e802a3;
// }
// :root[data-theme="dark"] {
//   --text: #d7d9ff;
//   --background: #000012;
//   --primary: #8089fe;
//   --secondary: #9e019e;
//   --accent: #fd14b6;
// }


// :root[data-theme="light"] {
//   --text: #05111a;
//   --background: #e5eefa;
//   --primary: #144376;
//   --secondary: #e779e4;
//   --accent: #cc2461;
// }
// :root[data-theme="dark"] {
//   --text: #e5f1fa;
//   --background: #050e1a;
//   --primary: #89b9eb;
//   --secondary: #861883;
//   --accent: #db3371;
// }
// fontSize: {
//   sm: '0.800rem',
//   base: '1rem',
//   xl: '1.250rem',
//   '2xl': '1.563rem',
//   '3xl': '1.954rem',
//   '4xl': '2.442rem',
//   '5xl': '3.053rem',
// },
// fontFamily: {
//   heading: 'LXGW WenKai TC',
//   body: 'LXGW WenKai TC',
// },
// fontWeight: {
//   normal: '400',
//   bold: '700',
// },

// fontSize: {
//   sm: '0.800rem',
//   base: '1rem',
//   xl: '1.250rem',
//   '2xl': '1.563rem',
//   '3xl': '1.954rem',
//   '4xl': '2.442rem',
//   '5xl': '3.053rem',
// },
// fontFamily: {
//   heading: 'Griffy',
//   body: 'Griffy',
// },
// fontWeight: {
//   normal: '400',
//   bold: '700',
// },