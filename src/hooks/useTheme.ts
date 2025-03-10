import { useMemo, useEffect, useState } from "react";
import { createTheme, Theme } from "@mui/material/styles";

const useMuiTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "light"
  );

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  const muiTheme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: theme,
          primary: {
            main: theme === "dark" ? "#B3ABF9" : "#255DC1",
          },
          background: {
            default: theme === "dark" ? "#050e1a" : "#FDFFFC",
            paper: theme === "dark" ? "#050e1a" : "#FDFFFC",
          },
          text: {
            primary: theme === "dark" ? "#d7d9ff" : "#000229",
            // secondary: theme === "dark" ? "#9e019e" : "#fe62fe",
          },
          secondary: {
            main: theme === "dark" ? "#bc00dd" : "#bc00dd",
          },
        },
      }),
    [theme]
  );

  return muiTheme;
};

export default useMuiTheme;