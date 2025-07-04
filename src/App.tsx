import React, {useEffect, useState, lazy, Suspense} from "react";
import "./App.css";
import {SnackbarProvider} from "notistack";
import {useDispatch} from "react-redux";
import {fetchBoards} from "./redux/boards/operations";
import {AppDispatch} from "./redux/store";

const Header = lazy(() => import("./components/Header/Header"));
const Board = lazy(() => import("./components/Board/Board"));

const App: React.FC = () => {
 const dispatch = useDispatch<AppDispatch>();
 const [theme, setTheme] = useState<"light" | "dark">(
  () => (localStorage.getItem("theme") as "light" | "dark") || "light"
 );

 useEffect(() => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem("theme", theme);
 }, [theme]);

 // Fetch boards when app loads
 useEffect(() => {
  dispatch(fetchBoards());
 }, [dispatch]);

 return (
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
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
     <Header
      theme={theme}
      setTheme={setTheme}
     />
    </Suspense>
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
     <Board theme={theme} />
    </Suspense>
   </div>
  </SnackbarProvider>
 );
};

export default App;
