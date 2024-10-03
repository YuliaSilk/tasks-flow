import React from "react";
import Card from "../Card/Card";
interface CardListProps {
 cards: any[]; // Adjust type according to your card structure
}
const CardList: React.FC<CardListProps> = ({cards}) => {
 return (
  <div>
   <ul className="flex flex-col gap-4 ">
    {cards.map((card) => (
     <Card
      key={card._id}
      title={card.title}
      description={card.description}
      _id={card._id} // Ensure to use the correct ID
      onEdit={() => {}} // Define your edit handler
      onDelete={() => {}} // Define your delete handler
      columnId=""
      boardId=""
     />
    ))}
   </ul>
  </div>
 );
};

export default CardList;
