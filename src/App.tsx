import React, {useEffect, useState} from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Board from "./components/Board/Board";
import {SnackbarProvider} from "notistack";
import {ThemeProvider} from "@mui/material/styles";
import useMuiTheme from "./hooks/theme";

const App: React.FC = () => {
 const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

 useEffect(() => {
  localStorage.setItem("theme", theme);
  if (theme === "dark") {
   document.documentElement.classList.add("dark");
  } else {
   document.documentElement.classList.remove("dark");
  }
 }, [theme]);

 const muiTheme = useMuiTheme();

 return (
  <ThemeProvider theme={muiTheme}>
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
  </ThemeProvider>
 );
};

export default App;
