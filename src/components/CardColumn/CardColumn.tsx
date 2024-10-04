import React from "react";
import ButtonAddCard from "../UI/Buttons/ButtonAddCard";
import CardList from "../CardList/CardList";

interface CardColumnProps {
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
 {column, name, columnId, cards}: CardColumnProps = {column: {}, columnId: "", name: "", cards: []}
) => {
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
     <ButtonAddCard />
    </div>
   )}
  </div>
 );
};

export default CardColumn;
