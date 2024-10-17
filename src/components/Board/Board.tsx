import React, {useState} from "react";
import {useSelector} from "react-redux";
import CardColumn from "../CardColumn/CardColumn";
import {DragDropContext} from "react-beautiful-dnd";
import {useDispatch} from "react-redux";
import {dndMovement} from "../../redux/cards/operations";
import {AppDispatch} from "../../redux/store";
import DotLoader from "react-spinners/DotLoader";
import {getBoardById} from "../../redux/boards/operations";

const Board: React.FC = () => {
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const [state, setState] = useState<AppDispatch>();
 const [loading, setLoading] = useState(false);
 const dispatch = useDispatch<AppDispatch>();

 const currentBoard = useSelector((state: any) => state.boards.currentBoard);

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

 const onDragEnd = async (result) => {
  const {source, destination, draggableId} = result;

  if (!destination) return;

  const cardId = typeof draggableId === "object" ? draggableId._id : draggableId;

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
  const sourceColumnIndex = columns.findIndex((column) => column._id === source.droppableId);
  const destinationColumnIndex = columns.findIndex((column) => column._id === destination.droppableId);

  const sourceColumn = columns[sourceColumnIndex];
  const destinationColumn = columns[destinationColumnIndex];

  const sourceCards = Array.from(sourceColumn.cards);
  const destinationCards = Array.from(destinationColumn.cards);

  const [movedCard] = sourceCards.splice(source.index, 1);
  destinationCards.splice(destination.index, 0, movedCard);

  const newColumns = [...columns];
  newColumns[sourceColumnIndex] = {...sourceColumn, cards: sourceCards};
  newColumns[destinationColumnIndex] = {...destinationColumn, cards: destinationCards};

  setState({...currentBoard, columns: newColumns});

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
  } finally {
   setLoading(false);
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
      {columns.map((column) => (
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
