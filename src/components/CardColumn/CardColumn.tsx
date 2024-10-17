import React, {useState, memo, useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import ButtonAdd from "../UI/Buttons/ButtonAdd";
import CardList from "../CardList/CardList";
import {Droppable} from "react-beautiful-dnd";
import DotLoader from "react-spinners/DotLoader";

interface CardColumnProps {
 boardId: string;
 columnId: string;
 column: {cards: any[]};
 name: string;
}
const CardColumn: React.FC<CardColumnProps> = memo(({boardId, columnId = "", column, name = ""}) => {
 const dispatch = useDispatch<AppDispatch>();
 const [, setSelectedBoardId] = useState("");
 const [loading, setLoading] = useState(false);
 const handleOpenModal = (boardId: string, columnId: string) => {
  setSelectedBoardId(boardId);
 };
 useEffect(() => {
  const loadCards = async () => {
   setLoading(true);
   setLoading(false);
  };

  loadCards();
 }, [dispatch, columnId]);

 return (
  <div className="min-w-[300px] md:min-w-[300px] lg:min-w-[440px] h-[74vh] p-3 bg-cyan-400/10 rounded-lg flex flex-col gap-6 items-center border-solid border-[1px] border-secondary">
   <h2 className="text-primary-accent text-[24px] font-bold mb-3">{name}</h2>
   <div className="h-[60vh] overflow-y-auto scroll-smooth">
    {loading ? (
     <div className="flex items-center justify-center h-screen">
      <DotLoader
       color="#910A67"
       loading={loading}
       size={60}
      />
     </div>
    ) : (
     <Droppable droppableId={columnId}>
      {(provided) => (
       <div
        {...provided.droppableProps}
        ref={provided.innerRef}
       >
        <CardList
         columnId={columnId}
         cards={column.cards}
        />
        {provided.placeholder}
       </div>
      )}
     </Droppable>
    )}
   </div>

   {name === "To Do" && (
    <div className="w-full h-14 rounded-full flex justify-center items-center">
     <ButtonAdd
      actionType="card"
      title="Create a new card"
      columnId={columnId}
      boardId={boardId}
      onClick={() => handleOpenModal(boardId, columnId)}
     />
    </div>
   )}
  </div>
 );
});
export default CardColumn;
