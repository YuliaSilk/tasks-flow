import React from "react";
import "./App.css";
// import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
// import {BoardProvider} from "./components/Board/BoardContext";
// import BoardComponent from "./components/Board/BoardComponent";
import Board from "./components/Board/Board";

const App: React.FC = () => {
 return (
  <div>
   {/* <BoardProvider> */}
   <Header />
   {/* <BoardComponent /> */}
   <Board />
   {/* </BoardProvider> */}
  </div>
 );
};

export default App;
