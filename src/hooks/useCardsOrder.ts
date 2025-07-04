import { useState, useEffect, useRef } from "react";

const useCardsOrder = (columns, currentBoardId) => {
  const [localColumns, setLocalColumns] = useState(columns || []);
  const columnsRef = useRef(columns);
  const initialLoadRef = useRef(false);

  useEffect(() => {
    // Skip if no boardId
    if (!currentBoardId) return;

    // Handle initial load from localStorage
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      const savedColumns = localStorage.getItem(currentBoardId);
      
      if (savedColumns) {
        try {
          const parsedColumns = JSON.parse(savedColumns);
          if (parsedColumns && Array.isArray(parsedColumns) && parsedColumns.length > 0) {
            setLocalColumns(parsedColumns);
            columnsRef.current = parsedColumns;
            return;
          }
        } catch (e) {
          console.error('Error parsing saved columns:', e);
        }
      }
    }

    // Handle updates from props
    if (columns && 
        JSON.stringify(columns) !== JSON.stringify(columnsRef.current) && 
        columns.length > 0) {
      setLocalColumns(columns);
      columnsRef.current = columns;
      localStorage.setItem(currentBoardId, JSON.stringify(columns));
    }
  }, [currentBoardId, columns]);

  const saveColumnOrderToLocalStorage = (newColumns) => {
    if (!currentBoardId || !newColumns || !Array.isArray(newColumns)) return;
    
    localStorage.setItem(currentBoardId, JSON.stringify(newColumns));
    setLocalColumns(newColumns);
    columnsRef.current = newColumns;
  };

  return { 
    localColumns, 
    setLocalColumns: (newColumns) => {
      setLocalColumns(newColumns);
      columnsRef.current = newColumns;
    }, 
    saveColumnOrderToLocalStorage 
  };
};

export default useCardsOrder;