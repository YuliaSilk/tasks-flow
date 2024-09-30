import React, {useEffect, useContext} from "react";
import {useSelector, useDispatch} from "react-redux";
import {getBoardById} from "../../redux/boards/operations";
import {BoardContext} from "./BoardContext";
import {AppDispatch} from "../../redux/store";

const Board = () => {
 const dispatch = useDispatch<AppDispatch>();
 const currentBoard = useSelector((state: any) => state.boards.currentBoard);

 const {getBoardByID} = useContext(BoardContext)!;
 const boardID = getBoardByID(currentBoard?._id); // Use optional chaining here

 useEffect(() => {
  if (boardID) {
   dispatch(getBoardById(boardID));
  }
 }, [boardID, dispatch]);

 if (!currentBoard) {
  return <div>Loading board...</div>;
 }

 const columns = Array.isArray(currentBoard.columns) ? currentBoard.columns : [];

 if (columns.length === 0) {
  return <div>No columns available.</div>;
 }

 return (
  <div className="bg-primary-tertiary w-[300px] h-[80vh] p-3">
   <h2>{currentBoard.title}</h2>
   <div className="columns">
    {/* {columns.map((column) => (
     <div
      key={column._id}
      className="column"
     >
      <h3>{column.name}</h3> */}
    {/* <div className="cards">
       {Array.isArray(column.card) &&
        column.card.map((card) => (
         <div
          key={card.id}
          className="card"
         >
          <p>{card.title}</p>
         </div> */}
    {/* ))} */}
    {/* </div> */}
   </div>
   {/* // ))} */}
   {/* </div> */}
  </div>
 );
};

export default Board;
