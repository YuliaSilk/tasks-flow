import React from "react";
import Card from "../Card/Card";

interface CardListProps {
 columnId: string;
 cards: {
  _id: string;
  title: string;
  description: string;
 }[];
}
const CardList: React.FC<CardListProps> = ({columnId, cards}) => {
 console.log("Rendering CardList component");

 return (
  <div>
   <ul className="flex flex-col gap-4 ">
    {cards.length > 0 ? (
     cards.map((card) => (
      <li key={card._id}>
       <Card
        _id={card._id}
        title={card.title}
        description={card.description}
        onEdit={() => {}}
        onDelete={() => {}}
        columnId={columnId}
        boardId={""}
        open={() => {}}
       />
      </li>
     ))
    ) : (
     <div>No cards available</div>
    )}
   </ul>
  </div>
 );
};

export default CardList;
