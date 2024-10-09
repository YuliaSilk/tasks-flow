import React from "react";
import Card from "../Card/Card";

interface CardListProps {
 columnId: string;
 cards?: {
  _id: string;
  title: string;
  description: string;
  //   ref: any;
 }[];
}
const CardList = React.forwardRef<HTMLDivElement, CardListProps>(({columnId, cards = []}, ref) => {
 console.log("Rendering CardList component");

 return (
  <div ref={ref}>
   <ul className="flex flex-col gap-4 ">
    {cards.length > 0 ? (
     cards.map((card, index) => (
      <li key={card._id}>
       <Card
        _id={card._id}
        index={index}
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
});

export default CardList;
