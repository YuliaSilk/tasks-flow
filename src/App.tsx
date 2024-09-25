import React from "react";
import "./App.css";
import Board from "./components/Board/Board";

const App: React.FC = () => {
 return (
  <div className="w-full h-screen p-10">
   <h1>Tasks Flow</h1>

   <Board
    id={1}
    title={""}
   />
  </div>
 );
};

export default App;
