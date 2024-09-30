import React from "react";
import ButtonAddCard from "../UI/Buttons/ButtonAddCard";
// import ButtonAdd from "../UI/Buttons/ButtonAdd";
import Card from "../Card/Card";
// interface CardColumnProps {
//  title: string;
//  cards: any[];
// }
const CardColumn = ({column}) => {
 return (
  <div className="w-[300px] md:w-[400px] lg:w-[500px] h-[80vh] p-3 bg-cyan-400/10 rounded-lg flex flex-col gap-4 justify-between items-center border-solid border-[1px] border-secondary">
   <h2 className="text-primary-accent text-[24px] font-bold">{column.title}</h2>
   <div className="h-[60vh] overflow-y-auto scroll-smooth">
    {column.cards.map((card) => (
     <Card
      key={card._id}
      title={card.title}
      description={card.description}
      _id={card._id} // Ensure to use the correct ID
      onEdit={() => {}} // Define your edit handler
      onDelete={() => {}} // Define your delete handler
     />
    ))}
   </div>
   <div className="w-full h-14 rounded-full flex justify-center items-center">
    <ButtonAddCard />
   </div>
  </div>
 );
};

export default CardColumn;
