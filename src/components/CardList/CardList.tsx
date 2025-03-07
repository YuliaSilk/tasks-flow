import React from "react";
import Card from "../Card/Card";
import {CardListProps} from "../../types/interfaces";

const CardList = React.forwardRef<HTMLDivElement, CardListProps>(({columnId, cards = []}, ref) => {
 return (
  <div ref={ref}>
   <ul className="flex flex-col gap-4 w-full">
    {cards.length > 0 ? (
     cards.map((card, index) => (
      <li key={card._id}>
       <Card
        _id={card._id}
        index={index}
        title={card.title}
        description={card.description}
        columnId={columnId}
        boardId={""}
       />
      </li>
     ))
    ) : (
     <div className="text-center text-text-light dark:text-text-dark">No tasks available</div>
    )}
   </ul>
  </div>
 );
});

export default CardList;
