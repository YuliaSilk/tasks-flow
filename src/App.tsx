import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Board from "./components/Board/Board";

const App: React.FC = () => {
 return (
  <div>
   <Header />
   <Board />
  </div>
 );
};

export default App;
