import React, {useState} from "react";
import ButtonAdd from "../UI/Buttons/ButtonAdd";
import CardList from "../CardList/CardList";
import {useSelector} from "react-redux";

interface CardColumnProps {
 boardId: string;
 columnId: string;
 column: any;
 name: string;
 cards: {
  _id: string;
  title: string;
  description: string;
 }[];
}

const CardColumn = (
 {column, name, columnId, boardId, cards}: CardColumnProps = {
  boardId: "",
  columnId: "",
  column: {},
  name: "",
  cards: [],
 }
) => {
 const [, setSelectedBoardId] = useState("");

 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const fetchedCards = useSelector((state: any) => state.cards[columnId] || []);

 const handleOpenModal = (boardId: string, columnId: string) => {
  setSelectedBoardId(boardId);
 };

 return (
  <div className="w-[300px] md:w-[400px] lg:w-[500px] h-[80vh] p-3 bg-cyan-400/10 rounded-lg flex flex-col gap-4 justify-between items-center border-solid border-[1px] border-secondary">
   <h2 className="text-primary-accent text-[24px] font-bold">{name}</h2>
   <div className="h-[60vh] overflow-y-auto scroll-smooth">
    <CardList
     columnId={columnId}
     cards={cards}
    />
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

export default CardColumn;
