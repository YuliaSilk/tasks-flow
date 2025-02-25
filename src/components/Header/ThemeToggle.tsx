// import React from "react";
// import {useEffect, useState} from "react";

// export default function ThemeToggle() {
//  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//  useEffect(() => {
//   if (theme === "darkt") {
//    document.documentElement.classList.add("dark");
//   } else {
//    document.documentElement.classList.remove("dark");
//   }
//   console.log("theme", theme);
//   localStorage.setItem("theme", theme);
//  }, [theme]);

//  return (
//   <button
//    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
//    className="p-2 rounded bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark"
//   >
//    {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
//   </button>
//  );
// }
