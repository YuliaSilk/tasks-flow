import React from "react";
import {useSelector} from "react-redux";
import CardColumn from "../CardColumn/CardColumn";
import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {dndMovement} from "../../redux/cards/operations";
import {AppDispatch} from "../../redux/store";
import {getBoardById} from "../../redux/boards/operations";
const Board = () => {
 const currentBoard = useSelector((state: any) => state.boards.currentBoard);
 console.log("Current board data:", currentBoard);
 const dispatch = useDispatch<AppDispatch>();

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

 const onDragEnd = (result) => {
  const {source, destination, draggableId} = result;

  if (!destination) return;

  const cardId = typeof draggableId === "object" ? draggableId._id : draggableId;

  console.log("Dragging card with id:", cardId);
  console.log("From column:", source.droppableId);
  console.log("To column:", destination.droppableId);

  if (
   typeof cardId !== "string" ||
   typeof source.droppableId !== "string" ||
   typeof destination.droppableId !== "string"
  ) {
   console.error("Invalid IDs detected:", cardId, source.droppableId, destination.droppableId);
   return;
  }
  if (source.droppableId === destination.droppableId && source.index === destination.index) {
   return;
  }
  dispatch(
   dndMovement({
    cardId,
    sourceColumnId: source.droppableId,
    destinationColumnId: destination.droppableId,
    boardId: currentBoard._id,
    destinationIndex: destination.index,
   })
  )
   .then(() => {
    dispatch(getBoardById(currentBoard._id));
   })
   .catch((error) => {
    console.error("Error during drag and drop movement:", error);
   });
 };

 return (
  <DragDropContext onDragEnd={onDragEnd}>
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
  </DragDropContext>
 );
};

export default Board;
