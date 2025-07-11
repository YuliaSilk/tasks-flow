import React from "react";
import {CardListProps} from "../../types/interfaces";
import Card from "../Card/Card";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";

const CardList: React.FC<CardListProps> = ({card = [], columnId, boardId}) => {
 console.log("CardList render:", {card, columnId, boardId});

 return (
  <ErrorBoundary>
   <div className="flex flex-col items-center gap-2">
    {card?.map((card, index) => {
     console.log("Rendering card:", {...card, index, columnId, boardId});
     return (
      <Card
       key={card._id}
       {...card}
       index={index}
       columnId={columnId}
       boardId={boardId}
      />
     );
    })}

    {(!card || card.length === 0) && (
     <div className="text-center py-4 text-gray-500 dark:text-gray-400">No cards found</div>
    )}
   </div>
  </ErrorBoundary>
 );
};

export default CardList;
