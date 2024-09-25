import React from "react";
import Card from "../Card/Card";
import cards from "../../helpers/cards-data.json";

const CardList: React.FC = () => {
 return (
  <div>
   <ul className="flex flex-col gap-4 ">
    {cards.map((card, id) => (
     <Card
      key={id}
      title={card.title}
      description={card.description}
     />
    ))}
   </ul>
  </div>
 );
};

export default CardList;
