import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import CardColumn from "../CardColumn/CardColumn";
import {DragDropContext} from "@hello-pangea/dnd";
import {useDispatch} from "react-redux";
import {dndMovement} from "../../redux/cards/operations";
import {AppDispatch} from "../../redux/store";
import DotLoader from "react-spinners/DotLoader";
import {getBoardById} from "../../redux/boards/operations";

const Board: React.FC = () => {
 const [loading] = useState(false);
 const dispatch = useDispatch<AppDispatch>();

 const currentBoard = useSelector((state: any) => state.boards.currentBoard);
 const {columns} = currentBoard || {columns: []};

 const [localColumns, setLocalColumns] = useState(columns);
 useEffect(() => {
  setLocalColumns(columns);
 }, [columns]);

 if (!currentBoard) {
  return (
   <div className="w-[96%] h-auto p-3 m-auto my-40 flex justify-center items-center align-middle ">
    <p className="text-primary-main text-[28px] font-bold text-center">
     No board selected. <br /> Please, select a board.
    </p>
   </div>
  );
 }

 const onDragEnd = async (result) => {
  const {source, destination, draggableId} = result;
  if (!destination) return;

  const cardId = draggableId;
  const sourceColumnIndex = localColumns.findIndex((column) => column._id === source.droppableId);
  const destinationColumnIndex = localColumns.findIndex((column) => column._id === destination.droppableId);

  if (sourceColumnIndex === -1 || destinationColumnIndex === -1) return;

  const sourceColumn = localColumns[sourceColumnIndex];
  const destinationColumn = localColumns[destinationColumnIndex];

  const sourceCards = [...sourceColumn.cards];
  const destinationCards = [...destinationColumn.cards];

  const [movedCard] = sourceCards.splice(source.index, 1);
  destinationCards.splice(destination.index, 0, movedCard);

  const newColumns = [...localColumns];
  newColumns[sourceColumnIndex] = {...sourceColumn, cards: sourceCards};
  newColumns[destinationColumnIndex] = {...destinationColumn, cards: destinationCards};

  setLocalColumns(newColumns);

  try {
   await dispatch(
    dndMovement({
     cardId,
     sourceColumnId: source.droppableId,
     destinationColumnId: destination.droppableId,
     boardId: currentBoard._id,
     destinationIndex: destination.index,
    })
   );

   await dispatch(getBoardById(currentBoard._id));
  } catch (error) {
   console.error("Error during drag and drop movement:", error);
   dispatch(getBoardById(currentBoard._id));
  }
 };

 return (
  <>
   {loading && (
    <div className="flex items-center justify-center h-screen">
     <DotLoader
      color="#910A67"
      loading={loading}
      size={60}
     />
    </div>
   )}
   <DragDropContext onDragEnd={onDragEnd}>
    <div className=" w-[100%] p-3 md:p-4 lg:p-5 mx-auto items-center">
     <h2 className="text-primary-main text-[24px] md:text-[36px] lg:text-[48px] font-bold text-center mb-5">
      {currentBoard.title}
     </h2>
     <div className=" flex  flex-col md:flex-row  gap-5 mx-auto md:justify-center">
      {localColumns.map((column) => (
       <CardColumn
        key={column._id}
        column={column}
        name={column.name}
        columnId={column._id}
        boardId={currentBoard._id}
       />
      ))}
     </div>
    </div>
   </DragDropContext>
  </>
 );
};

export default Board;
