import { useState, useEffect, useRef } from "react";

const useCardsOrder = (columns, currentBoardId) => {
  const [localColumns, setLocalColumns] = useState(columns || []);
  const columnsRef = useRef(columns);
  const initialLoadRef = useRef(false);

  const validateColumns = (cols) => {
    if (!Array.isArray(cols)) return false;
    return cols.every(col => 
      col && 
      typeof col === 'object' && 
      typeof col._id === 'string' && 
      col._id !== 'undefined' &&
      typeof col.name === 'string' &&
      Array.isArray(col.card)
    );
  };

  useEffect(() => {
    // Skip if no boardId or invalid boardId
    if (!currentBoardId || currentBoardId === 'undefined') {
      console.error('Invalid board ID:', currentBoardId);
      return;
    }

    // Handle initial load from localStorage
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      const savedColumns = localStorage.getItem(currentBoardId);
      
      if (savedColumns) {
        try {
          const parsedColumns = JSON.parse(savedColumns);
          if (validateColumns(parsedColumns)) {
            setLocalColumns(parsedColumns);
            columnsRef.current = parsedColumns;
            return;
          } else {
            console.error('Invalid columns structure in localStorage:', parsedColumns);
            localStorage.removeItem(currentBoardId); // Clear invalid data
          }
        } catch (e) {
          console.error('Error parsing saved columns:', e);
          localStorage.removeItem(currentBoardId); // Clear invalid data
        }
      }
    }

    // Handle updates from props
    if (columns && 
        JSON.stringify(columns) !== JSON.stringify(columnsRef.current) && 
        validateColumns(columns)) {
      setLocalColumns(columns);
      columnsRef.current = columns;
      localStorage.setItem(currentBoardId, JSON.stringify(columns));
    } else if (columns && !validateColumns(columns)) {
      console.error('Invalid columns structure from props:', columns);
    }
  }, [currentBoardId, columns]);

  const saveColumnOrderToLocalStorage = (newColumns) => {
    if (!currentBoardId || currentBoardId === 'undefined') {
      console.error('Invalid board ID for saving:', currentBoardId);
      return;
    }
    
    if (!validateColumns(newColumns)) {
      console.error('Invalid columns structure for saving:', newColumns);
      return;
    }
    
    localStorage.setItem(currentBoardId, JSON.stringify(newColumns));
    setLocalColumns(newColumns);
    columnsRef.current = newColumns;
  };

  return { 
    localColumns, 
    setLocalColumns: (newColumns) => {
      if (validateColumns(newColumns)) {
        setLocalColumns(newColumns);
        columnsRef.current = newColumns;
      } else {
        console.error('Invalid columns structure for setting:', newColumns);
      }
    }, 
    saveColumnOrderToLocalStorage 
  };
};

export default useCardsOrder;