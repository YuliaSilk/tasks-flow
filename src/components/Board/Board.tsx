import React, {useState} from "react";
import {useSelector} from "react-redux";
import CardColumn from "../CardColumn/CardColumn";
import {DragDropContext} from "@hello-pangea/dnd";
import DotLoader from "react-spinners/DotLoader";
import {useCardsOrder, useDnd} from "../../hooks";

const Board: React.FC = () => {
 const [loading] = useState(false);

 const currentBoard = useSelector((state: any) => state.boards.currentBoard);
 const isLoading = useSelector((state: any) => state.boards.isLoading);
 const {columns} = currentBoard || {columns: []};

 const {localColumns, setLocalColumns, saveColumnOrderToLocalStorage} = useCardsOrder(columns, currentBoard?._id);

 const {onDragEnd} = useDnd(localColumns, setLocalColumns, saveColumnOrderToLocalStorage, currentBoard?._id);

 if (!currentBoard) {
  return (
   <div className="w-[96%] h-auto p-3 m-auto my-40 flex justify-center items-center align-middle ">
    <p className="text-accent-lite dark:text-accent text-[20px] md:text-[28px] font-bold text-center">
     No board selected. <br /> Please, select a board or crseate a new one.
    </p>
   </div>
  );
 }

 return (
  <>
   {isLoading && (
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
     <h2 className="text-accent-light dark:text-accent-dark text-[24px] md:text-[36px] lg:text-[48px] font-bold text-center mb-5">
      {currentBoard.title || "Loading..."}
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
