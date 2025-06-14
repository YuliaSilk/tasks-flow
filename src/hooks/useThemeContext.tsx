// import React, {createContext, useContext, useState, useEffect} from "react";

// type Theme = "light" | "dark";

// interface ThemeContextType {
//  theme: Theme;
//  setTheme: (theme: Theme) => void;
// }

// const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// export const useThemeContext = (): ThemeContextType => {
//  const context = useContext(ThemeContext);
//  if (!context) {
//   throw new Error("useThemeContext must be used within a ThemeProvider");
//  }
//  return context;
// };

// interface ThemeProviderProps {
//  children: React.ReactNode;
// }

// export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
//  const [theme, setTheme] = useState<Theme>(() => {
//   const savedTheme = localStorage.getItem("theme");
//   return (savedTheme as Theme) || "light";
//  });

//  useEffect(() => {
//   localStorage.setItem("theme", theme);
//   if (theme === "dark") {
//    document.documentElement.classList.add("dark");
//   } else {
//    document.documentElement.classList.remove("dark");
//   }
//  }, [theme]);

//  return <ThemeContext.Provider value={{theme, setTheme}}>{children}</ThemeContext.Provider>;
// };
