import React from "react";
import {useSelector} from "react-redux";
import CardColumn from "../CardColumn/CardColumn";

const Board = () => {
 const currentBoard = useSelector((state: any) => state.boards.currentBoard);
 console.log("Current board data:", currentBoard);

 if (!currentBoard) {
  return (
   <div className="w-[96%] h-auto p-3 m-auto my-40 flex justify-center items-center align-middle ">
    <p className="text-primary-main text-[28px] font-bold text-center">
     No board selected. <br /> Please, select a board.
    </p>
   </div>
  );
 }
 const {columns} = currentBoard;

 return (
  <div className=" w-[96%] h-[80vh] p-3 mx-auto">
   <h2 className="text-primary-main text-[48px] font-bold text-center">{currentBoard.title}</h2>
   <div className="h-[60vh] flex gap-5 mx-auto">
    {columns.map((column) => (
     <CardColumn
      key={column._id}
      column={column}
      name={column.name}
      cards={column.cards}
      columnId={column._id}
      boardId={currentBoard._id}
     />
    ))}
   </div>
  </div>
 );
};

export default Board;
