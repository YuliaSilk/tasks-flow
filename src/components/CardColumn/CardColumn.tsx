import React, {useState} from "react";
import ButtonAdd from "../UI/Buttons/ButtonAdd";
import CardList from "../CardList/CardList";
import {useSelector} from "react-redux";
import {Droppable} from "react-beautiful-dnd";
import {selectColumns} from "../../redux/columns/selectors"; // your path to selectors

interface CardColumnProps {
 boardId: string;
 columnId: string;
 column: {};
 name: string;
 cards: {
  _id: string;
  title: string;
  description: string;
 }[];
}
const CardColumn: React.FC<CardColumnProps> = ({boardId, columnId = "", column, name = "", cards = []}) => {
 const [, setSelectedBoardId] = useState("");
 const fetchedCards = useSelector((state: any) => state.cards[columnId]);
 const columns = useSelector(selectColumns); // Keep this if you plan to use it
 const handleOpenModal = (boardId: string, columnId: string) => {
  setSelectedBoardId(boardId);
 };

 return (
  <div className="w-[300px] md:w-[400px] lg:w-[500px] h-[80vh] p-3 bg-cyan-400/10 rounded-lg flex flex-col gap-4 justify-between items-center border-solid border-[1px] border-secondary">
   <h2 className="text-primary-accent text-[24px] font-bold">{name}</h2>
   <div className="h-[60vh] overflow-y-auto scroll-smooth">
    <Droppable droppableId={columnId}>
     {(provided) => (
      <div
       {...provided.droppableProps}
       ref={provided.innerRef}
      >
       <CardList
        columnId={columnId}
        // cards={cards}
        cards={cards.length > 0 ? cards : fetchedCards || []}
       />
       {provided.placeholder}
      </div>
     )}
    </Droppable>
   </div>
   <div className="w-full">
    {columns.map((col: any) => (
     <div
      key={col._id}
      className="column"
     >
      {col.name}
     </div>
    ))}
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
};
export default React.memo(CardColumn);
// export default CardColumn;

// import React, {useState} from "react";
// import ButtonAdd from "../UI/Buttons/ButtonAdd";
// import CardList from "../CardList/CardList";
// import {useSelector} from "react-redux";
// import {Droppable} from "react-beautiful-dnd";
// import {memoizedColumnsSelector, selectColumns} from "../../redux/columns/selectors"; // ваш шлях до селекторів

// interface CardColumnProps {
//  boardId: string;
//  columnId: string;
//  column: {};
//  name: string;
//  cards: {
//   _id: string;
//   title: string;
//   description: string;
//  }[];
// }

// const CardColumn = ({boardId = "", columnId = "", column = {}, name = "", cards = []}: CardColumnProps) => {
//  const [, setSelectedBoardId] = useState("");
//  // eslint-disable-next-line @typescript-eslint/no-unused-vars
//  const fetchedCards = useSelector((state: any) => state.cards[columnId]);
//  //  const columns = useSelector(memoizedColumnsSelector);
//  const columns = useSelector(selectColumns);
//  const handleOpenModal = (boardId: string, columnId: string) => {
//   setSelectedBoardId(boardId);
//  };

//  return (
//   <div className="w-[300px] md:w-[400px] lg:w-[500px] h-[80vh] p-3 bg-cyan-400/10 rounded-lg flex flex-col gap-4 justify-between items-center border-solid border-[1px] border-secondary">
//    <h2 className="text-primary-accent text-[24px] font-bold">{name}</h2>
//    <div className="h-[60vh] overflow-y-auto scroll-smooth">
//     <Droppable droppableId={columnId}>
//      {(provided) => (
//       <div
//        {...provided.droppableProps}
//        ref={provided.innerRef}
//       >
//        <CardList
//         columnId={columnId}
//         cards={cards}
//        />
//        {provided.placeholder}
//       </div>
//      )}
//     </Droppable>
//    </div>
//    {name === "To Do" && (
//     <div className="w-full h-14 rounded-full flex justify-center items-center">
//      <ButtonAdd
//       actionType="card"
//       title="Create a new card"
//       columnId={columnId}
//       boardId={boardId}
//       onClick={() => handleOpenModal(boardId, columnId)}
//      />
//     </div>
//    )}
//   </div>
//  );
// };

// export default CardColumn;
