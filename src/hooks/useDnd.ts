import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { dndMovement } from '../redux/cards/operations';

const useDnd = (localColumns, setLocalColumns, saveColumnOrderToLocalStorage, currentBoardId) => {
    const dispatch = useDispatch<AppDispatch>();

    const onDragEnd = async (result) => {
        const { source, destination, draggableId } = result;
        if (!destination) return;
    
        const cardId = draggableId;
        const sourceColumnIndex = localColumns.findIndex((column) => column._id === source.droppableId);
        const destinationColumnIndex = localColumns.findIndex((column) => column._id === destination.droppableId);
    
        const sourceColumn = localColumns[sourceColumnIndex];
        const destinationColumn = localColumns[destinationColumnIndex];
    
        const sourceCards = [...sourceColumn.cards];
        const destinationCards = [...destinationColumn.cards];
    
        const [movedCard] = sourceCards.splice(source.index, 1);
        let updatedColumns = [...localColumns];
    
        if (source.droppableId === destination.droppableId) {
          sourceCards.splice(destination.index, 0, movedCard);
          updatedColumns[sourceColumnIndex] = { ...sourceColumn, cards: sourceCards };
        } else {
          destinationCards.splice(destination.index, 0, movedCard);
          updatedColumns[sourceColumnIndex] = { ...sourceColumn, cards: sourceCards };
          updatedColumns[destinationColumnIndex] = { ...destinationColumn, cards: destinationCards };
        }
    
        setLocalColumns(updatedColumns);
        saveColumnOrderToLocalStorage(updatedColumns);
    
        try {
          await dispatch(
            dndMovement({
              cardId,
              card: movedCard,
              finishTaskIndex: destination.index,
              sourceColumnId: source.droppableId,
              destinationColumnId: destination.droppableId,
              boardId: currentBoardId,
              destinationIndex: destination.index,
            })
          );
        } catch (error) {
          console.error("Error during drag and drop movement:", error);
        }
      };
    
    return { onDragEnd };
};

export default useDnd;