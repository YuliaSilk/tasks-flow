// import React, {useEffect, useState} from "react";
// import "./App.css";
// import Header from "./components/Header/Header";
// import Board from "./components/Board/Board";
// import {SnackbarProvider} from "notistack";
// import {ThemeProvider} from "@mui/material/styles";
// import {useMuiTheme} from "./hooks";

// const App: React.FC = () => {
//  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

//  useEffect(() => {
//   localStorage.setItem("theme", theme);
//   if (theme === "dark") {
//    document.documentElement.classList.add("dark");
//   } else {
//    document.documentElement.classList.remove("dark");
//   }
//  }, [theme]);

//  const muiTheme = useMuiTheme();

//  return (
//   <ThemeProvider theme={muiTheme}>
//    <SnackbarProvider
//     maxSnack={2}
//     anchorOrigin={{
//      vertical: "top",
//      horizontal: "right",
//     }}
//    >
//     <div
//      className={`min-h-screen flex flex-col gap-2 md:gap-4 lg:gap-6 transition-colors duration-300 ${
//       theme === "light" ? "text-text-light bg-background-light" : "dark:text-text-dark dark:bg-background-dark"
//      }`}
//     >
//      <Header
//       theme={theme}
//       setTheme={setTheme}
//      />
//      <Board />
//     </div>
//    </SnackbarProvider>
//   </ThemeProvider>
//  );
// };

// export default App;
import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Board from "./components/Board/Board";
import {SnackbarProvider} from "notistack";
import {ThemeProvider as MuiThemeProvider} from "@mui/material/styles";
import {useMuiTheme} from "./hooks";
import {ThemeProvider, useThemeContext} from "./hooks/useThemeContext"; // Переконайтесь, що контекст імпортується правильно

const App: React.FC = () => {
 const {theme, setTheme} = useThemeContext(); // Отримуємо тему з контексту
 const muiTheme = useMuiTheme(); // Передаємо тему в MUI через кастомний хук

 return (
  <MuiThemeProvider theme={muiTheme}>
   <SnackbarProvider
    maxSnack={2}
    anchorOrigin={{
     vertical: "top",
     horizontal: "right",
    }}
   >
    <div
     className={`min-h-screen flex flex-col gap-2 md:gap-4 lg:gap-6 transition-colors duration-300 ${
      theme === "light" ? "text-text-light bg-background-light" : "dark:text-text-dark dark:bg-background-dark"
     }`}
    >
     <Header
      theme={theme}
      setTheme={setTheme}
     />
     <Board />
    </div>
   </SnackbarProvider>
  </MuiThemeProvider>
 );
};

const Root: React.FC = () => (
 <ThemeProvider>
  <App />
 </ThemeProvider>
);

export default Root;
