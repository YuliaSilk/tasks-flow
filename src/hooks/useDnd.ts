import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { dndMovement } from '../redux/cards/operations';
import { DndMovementPayload } from '../types/interfaces';

const useDnd = (localColumns, setLocalColumns, saveColumnOrderToLocalStorage, currentBoardId) => {
    const dispatch = useDispatch<AppDispatch>();

    const onDragEnd = async (result) => {
        if (!currentBoardId || currentBoardId === 'undefined') {
            console.error("Invalid board ID for DnD:", currentBoardId);
            return;
        }

        const { source, destination, draggableId } = result;
        if (!destination) return;
    
        const sourceColumnIndex = localColumns.findIndex((column) => column._id === source.droppableId);
        const destinationColumnIndex = localColumns.findIndex((column) => column._id === destination.droppableId);
    
        const sourceColumn = localColumns[sourceColumnIndex];
        const destinationColumn = localColumns[destinationColumnIndex];
        
        if (!sourceColumn || !destinationColumn) {
            console.error("Invalid source or destination column:", { sourceColumn, destinationColumn });
            return;
        }
        
        // Ensure cards arrays exist and are arrays
        const sourceCards = Array.isArray(sourceColumn.card) ? [...sourceColumn.card] : [];
        const destinationCards = Array.isArray(destinationColumn.card) ? [...destinationColumn.card] : [];
    
        const [movedCard] = sourceCards.splice(source.index, 1);
        if (!movedCard) {
            console.error("No card found at source index:", source.index);
            return;
        }

        const updatedColumns = [...localColumns];
    
        if (source.droppableId === destination.droppableId) {
          sourceCards.splice(destination.index, 0, movedCard);
          updatedColumns[sourceColumnIndex] = { ...sourceColumn, card: sourceCards };
        } else {
          destinationCards.splice(destination.index, 0, movedCard);
          updatedColumns[sourceColumnIndex] = { ...sourceColumn, card: sourceCards };
          updatedColumns[destinationColumnIndex] = { ...destinationColumn, card: destinationCards };
        }
    
        setLocalColumns(updatedColumns);
        saveColumnOrderToLocalStorage(updatedColumns);
    
        try {
          const payload: DndMovementPayload = {
            cardId: draggableId,
            card: movedCard,
            finishTaskIndex: destination.index,
            sourceColumnId: source.droppableId,
            destinationColumnId: destination.droppableId,
            boardId: currentBoardId,
            destinationIndex: destination.index,
          };
          
          await dispatch(dndMovement(payload));
        } catch (error) {
          console.error("Error during drag and drop movement:", error);
        }
      };
    
    return { onDragEnd };
};

export default useDnd;