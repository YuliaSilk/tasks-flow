import React from "react";
import {useSelector} from "react-redux";
import CardColumn from "../CardColumn/CardColumn";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {dndMovement} from "../../redux/cards/operations";
import {AppDispatch} from "../../redux/store";
import {BoardProps, ColumnProps} from "../../types/types"; // Import your types

const Board: React.FC<BoardProps> = () => {
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

 const onDragEnd = (result: DropResult) => {
  const {destination, source} = result;

  if (!destination) return;
  //   const {columns} = currentBoard;
  console.log("Columns data:", columns);

  if (!columns || columns.length === 0) {
   console.error("Columns are not available or empty.");
   return;
  }
  const startColumn = columns.find((col: ColumnProps) => col._id === source.droppableId);

  const finishColumn = columns.find((col: ColumnProps) => col._id === destination.droppableId);

  if (!startColumn || !finishColumn) {
   console.error("Invalid column identifiers");
   return;
  }

  const draggableCard = startColumn.cards[source.index];

  if (!draggableCard) {
   console.error("Draggable card not found.");
   return;
  }

  if (startColumn._id === finishColumn._id && source.index === destination.index) {
   return;
  }

  const draggableId = startColumn.cards[source.index];
  //   console.log("Draggable ID for card:", cardId);
  if (!draggableId) {
   console.error("Draggable card not found.");
   return;
  }
  console.log(`Dragging card with id: ${draggableId} from ${source.droppableId} to ${destination.droppableId}`);

  const finishColumnCards = finishColumn.cards ? [...finishColumn.cards] : [];

  if (startColumn._id === finishColumn._id && source.index === destination.index) {
   return;
  }

  const startColumnCards = [...(startColumn.cards || [])];
  startColumnCards.splice(source.index, 1);

  finishColumnCards.splice(destination.index, 0, draggableId);

  dispatch(
   dndMovement({
    boardId: currentBoard._id,
    startColumnID: source.droppableId,
    finishColumnID: destination.droppableId,
    cardId: draggableId._id,
    destinationIndex: destination.index,
    finishCardIndex: destination.index,
   })
  );
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
