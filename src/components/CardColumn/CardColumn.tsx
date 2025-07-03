import React, {useState, memo, useEffect} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import ButtonAdd from "../UI/Buttons/ButtonAdd";
import CardList from "../CardList/CardList";
import {Droppable} from "@hello-pangea/dnd";
import DotLoader from "react-spinners/DotLoader";
import {CardProps} from "../../types/interfaces";

interface CardColumnProps {
 boardId: string;
 columnId: string;
 column: {cards: CardProps[]};
 name: string;
 theme: "light" | "dark";
}
const CardColumn: React.FC<CardColumnProps> = memo(({boardId, columnId = "", column, name = "", theme}) => {
 const dispatch = useDispatch<AppDispatch>();
 const [loading, setLoading] = useState(false);

 useEffect(() => {
  const loadCards = async () => {
   setLoading(true);
   setLoading(false);
  };

  loadCards();
 }, [dispatch, columnId]);

 return (
  <div className=" min-w-[300px] md:min-w-[240px] lg:min-w-[440px] h-auto md:h-[74vh] p-3 rounded-lg flex flex-col gap-6 lg:gap-8 items-center ">
   <div className="w-[calc((min(100vw,1440px)-24px)/3)] min-w-[240px] max-w-[280px] md:max-w-[440px] h-auto md:h-[74vh] p-3 rounded-lg flex flex-col gap-6  items-center hover:bg-secondary-dark/10 hover:dark:bg-secondary-dark/20">
    <h2 className="text-primary-light dark:text-primary-dark text-[24px] font-bold mb-3">{name}</h2>
    <div className="h-auto max-h-[60vh] overflow-y-auto scroll-smooth w-full">
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
          theme={theme}
          boardId={boardId}
         />
         {provided.placeholder}
        </div>
       )}
      </Droppable>
     )}
    </div>

    {name === "To Do" && (
     <div className="w-full h-14 rounded-full flex justify-center items-center text-secondary-light dark:text-secondary-dark">
      <ButtonAdd
       actionType="card"
       title="Create a new card"
       columnId={columnId}
       boardId={boardId}
      />
     </div>
    )}
   </div>
  </div>
 );
});
export default CardColumn;
