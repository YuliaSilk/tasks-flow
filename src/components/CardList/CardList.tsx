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

// import React from "react";
// import Card from "../Card/Card";

// interface CardListProps {
//  columnId: string;
//  cards: any[];
// }

// const CardList: React.FC<CardListProps> = ({columnId, cards}) => {
//  return (
//   <div>
//    <ul className="flex flex-col gap-4">
//     {cards.length > 0 ? (
//      cards.map((card) => (
//       <Card
//        key={card._id}
//        _id={card._id}
//        title={card.title}
//        description={card.description}
//        onEdit={() => {}}
//        onDelete={() => {}}
//       />
//      ))
//     ) : (
//      <div>No cards available</div>
//     )}
//    </ul>
//   </div>
//  );
// };

// export default CardList;

// import React from "react";
// import Card from "../Card/Card";
// import {useSelector} from "react-redux";

// interface CardListProps {
//  columnIndex: number; // Індекс колонки для доступу до відповідних карток
// }

// const CardList: React.FC<CardListProps> = ({columnIndex}) => {
//  console.log("Rendering CardList component");

//  const cardsOfColumn = useSelector((state: any) => state.boards.currentBoard?.columns[columnIndex]?.cards || []);

//  if (cardsOfColumn.length === 0) {
//   return <div>No cards available</div>;
//  }

//  return (
//   <div>
//    <ul className="flex flex-col gap-4">
//     {cardsOfColumn.map((card: any) => (
//      <Card
//       key={card._id}
//       title={card.title}
//       description={card.description}
//       _id={card._id}
//       onEdit={() => {}}
//       onDelete={() => {}}
//       columnId="" // Якщо є можливість отримати columnId, додайте його
//       boardId=""
//      />
//     ))}
//    </ul>
//   </div>
//  );
// };

// export default CardList;

// cardsOfColumn.map(
//     (card: any) => (
//     console.log("MY CARDS:", card),
//     (
//     <Card
//         key={card._id}
//         title={card.title}
//         description={card.description}
//         _id={card._id}
//         onEdit={() => {}}
//         onDelete={() => {}}
//         columnId={currentBoard.columns[columnId]._id}
//         boardId={currentBoard._id}
//     />
//   )
//  )
// )}
