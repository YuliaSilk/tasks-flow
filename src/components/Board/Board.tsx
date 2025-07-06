import React, {useState, useEffect, lazy, Suspense} from "react";
import {useSelector, useDispatch} from "react-redux";
import {DragDropContext} from "@hello-pangea/dnd";
import DotLoader from "react-spinners/DotLoader";
import {useCardsOrder, useDnd} from "../../hooks";
import {BoardsState} from "../../types/interfaces";
import {fetchCards} from "../../redux/cards/operations";
import {AppDispatch} from "../../redux/store";
import BoardSkeleton from "./BoardSkeleton";

const CardColumn = lazy(() => import("../CardColumn/CardColumn"));

interface BoardProps {
 theme: "light" | "dark";
}

const NoBoardSelected: React.FC = () => (
 <div className="w-[96%] h-auto p-3 m-auto my-40 flex justify-center items-center align-middle">
  <p className="text-accent-lite dark:text-accent text-[20px] md:text-[28px] font-bold text-center">
   No board selected. <br /> Please, select a board or create a new one.
  </p>
 </div>
);

const Board: React.FC<BoardProps> = ({theme}) => {
 const dispatch = useDispatch<AppDispatch>();
 const [loading] = useState(false);

 const currentBoard = useSelector((state: {boards: BoardsState}) => state.boards.currentBoard);
 const isLoading = useSelector((state: {boards: BoardsState}) => state.boards.isLoading);
 const {columns} = currentBoard || {columns: []};

 useEffect(() => {
  let mounted = true;

  const loadCards = async () => {
   if (currentBoard?._id && mounted) {
    await dispatch(fetchCards());
   }
  };

  loadCards();
  return () => {
   mounted = false;
  };
 }, [dispatch, currentBoard?._id]);

 const {localColumns, setLocalColumns, saveColumnOrderToLocalStorage} = useCardsOrder(columns, currentBoard?._id);

 const {onDragEnd} = useDnd(localColumns, setLocalColumns, saveColumnOrderToLocalStorage, currentBoard?._id);

 if (!currentBoard) {
  return <NoBoardSelected />;
 }

 if (isLoading) {
  return <BoardSkeleton />;
 }

 return (
  <DragDropContext onDragEnd={onDragEnd}>
   <div className="w-[100%] p-3 md:p-4 lg:p-5 mx-auto items-center">
    <h2 className="text-accent-light dark:text-accent-dark text-[24px] md:text-[36px] lg:text-[48px] font-bold text-center mb-5">
     {currentBoard.title || "Loading..."}
    </h2>
    <div className="flex flex-col md:flex-row gap-5 mx-auto md:justify-center">
     <Suspense
      fallback={
       <div className="flex items-center justify-center">
        <DotLoader
         color="#910A67"
         loading={loading}
         size={60}
        />
       </div>
      }
     >
      {localColumns.map((column) => (
       <CardColumn
        key={column._id}
        column={column}
        name={column.name}
        columnId={column._id}
        boardId={currentBoard._id}
        theme={theme}
       />
      ))}
     </Suspense>
    </div>
   </div>
  </DragDropContext>
 );
};

export default Board;
