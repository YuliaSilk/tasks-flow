import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Board from "./components/Board/Board";
import {SnackbarProvider} from "notistack";

const App: React.FC = () => {
 return (
  <SnackbarProvider
   maxSnack={2}
   anchorOrigin={{
    vertical: "top",
    horizontal: "right",
   }}
  >
   <div className="flex flex-col gap-2 md:gap-4 lg:gap-6">
    <Header />
    <Board />
   </div>
  </SnackbarProvider>
 );
};

export default App;
