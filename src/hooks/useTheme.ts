import { useMemo} from "react";
import { createTheme, Theme } from "@mui/material/styles";
import { useThemeContext } from './useThemeContext';

const useMuiTheme = () => {
  const {theme} = useThemeContext();
 
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
            main: theme === "dark" ? "#9e019e" : "#bc00dd",
          },
          error: {
            main: theme === "dark" ? "#F7023B" : "#ff0000",
          },
        },
      }),
    [theme]
  );

  return muiTheme;
};

export default useMuiTheme;
