import React from "react";
import "./App.css";
// import {DragDropContext} from "react-beautiful-dnd";
import Header from "./components/Header/Header";
import Board from "./components/Board/Board";
// import {dndMovement} from "./redux/cards/operations";

const App: React.FC = () => {
 //  const dispatch = useDispatch<AppDispatch>();
 //  const {currentBoard} = useSelector((state: any) => state.boards);

 //  const {columns} = useSelector((state: any) => state.boards);
 //  console.log("Columns:", columns);

 //  const onDragEnd = (result) => {
 //   const {destination, source} = result;

 //   // Перевіряємо наявність destination
 //   if (!destination) return;

 //   // Перевіряємо наявність колонок
 //   if (!columns || columns.length === 0) {
 //    console.error("Columns are not available or empty.");
 //    return;
 //   }

 //   // Перевіряємо наявність стартової колонки
 //   const startColumn = columns.find((col) => col._id === source.droppableId);
 //   if (!startColumn) {
 //    console.error(`Start column with ID ${source.droppableId} not found.`);
 //    return;
 //   }

 //   // Перевіряємо наявність кінцевої колонки
 //   const finishColumn = columns.find((col) => col._id === destination.droppableId);
 //   if (!finishColumn) {
 //    console.error(`Finish column with ID ${destination.droppableId} not found.`);
 //    return;
 //   }

 //   // Додаємо логіку для карток у стартовій і кінцевій колонках
 //   const draggableCard = startColumn.cards[source.index];

 //   // Перевіряємо, чи існує карта
 //   if (!draggableCard) {
 //    console.error("Draggable card not found.");
 //    return;
 //   }

 //   const finishColumnCards = finishColumn.cards ? [...finishColumn.cards] : [];

 //   // Якщо картка переміщується в ту саму позицію
 //   if (startColumn._id === finishColumn._id && source.index === destination.index) {
 //    return;
 //   }

 //   // Видаляємо картку з стартової колонки
 //   const startColumnCards = [...(startColumn.cards || [])];
 //   startColumnCards.splice(source.index, 1);

 //   // Додаємо картку в кінцеву колонку
 //   finishColumnCards.splice(destination.index, 0, draggableCard);

 //   // Викликаємо action для збереження змін
 //   dispatch(
 //    dndMovement({
 //     boardId: draggableCard.boardId,
 //     _id: draggableCard._id,
 //     finishCardIndex: destination.index,
 //     startColumnID: startColumn._id,
 //     finishColumnID: finishColumn._id,
 //    })
 //   );
 //  };

 return (
  //   <DragDropContext onDragEnd={onDragEnd}>
  <div>
   <Header />
   <Board />
  </div>
  //   {/* </DragDropContext> */}
 );
};

export default App;
