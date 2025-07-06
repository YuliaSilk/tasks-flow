import React, {useEffect, useState, lazy, Suspense} from "react";
import "./App.css";
import {SnackbarProvider} from "notistack";
import {useDispatch} from "react-redux";
import {fetchBoards} from "./redux/boards/operations";
import {AppDispatch} from "./redux/store";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";

const Header = lazy(() => import("./components/Header/Header"));
const Board = lazy(() => import("./components/Board/Board"));

const LoadingFallback = () => (
 <div className="flex items-center justify-center h-screen">
  <div className="animate-pulse">
   <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
   <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
  </div>
 </div>
);

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
  <ErrorBoundary>
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
     <Suspense fallback={<LoadingFallback />}>
      <Header
       theme={theme}
       setTheme={setTheme}
      />
     </Suspense>
     <Suspense fallback={<LoadingFallback />}>
      <Board theme={theme} />
     </Suspense>
    </div>
   </SnackbarProvider>
  </ErrorBoundary>
 );
};

export default App;
