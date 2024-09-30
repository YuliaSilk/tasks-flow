import React from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Header from "./components/Header/Header";
import {BoardProvider} from "./components/Board/BoardContext";

const App: React.FC = () => {
 return (
  <div>
   <BoardProvider>
    <Header />
    <Board
    //  id={"boardId"}
    //  title={"Board"}
    //  boardId={"boardId"}
    />
   </BoardProvider>
  </div>
 );
};

export default App;
