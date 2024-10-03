import React from "react";
import {useSelector} from "react-redux";
import CardColumn from "../CardColumn/CardColumn";

const Board = () => {
 const currentBoard = useSelector((state: any) => state.boards.currentBoard);

 if (!currentBoard) {
  return <div>No board selected.</div>;
 }
 const {columns} = currentBoard;

 return (
  <div className="bg-primary-tertiary w-[96%] h-[80vh] p-3 mx-auto">
   <h2 className="text-primary-main text-[48px] font-bold text-center">{currentBoard.title}</h2>
   <div className="h-[60vh] flex gap-5 mx-auto">
    {columns.map((column) => (
     <CardColumn
      key={column._id}
      column={column}
      name={column.name}
      cards={column.cards}
     />
    ))}
   </div>
  </div>
 );
};

export default Board;
