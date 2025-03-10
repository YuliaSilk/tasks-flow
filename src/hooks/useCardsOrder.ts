import { useState, useEffect, useRef } from "react";

const useCardsOrder = (columns, currentBoardId) => {
  const [localColumns, setLocalColumns] = useState(columns);
  const columnsRef = useRef(columns);

  useEffect(() => {
    if (columns !== columnsRef.current && columns.length > 0) {
      setLocalColumns(columns);
      columnsRef.current = columns;
    }
  }, [columns]);

  useEffect(() => {
    const savedColumns = localStorage.getItem(currentBoardId);
    if (savedColumns) {
      setLocalColumns(JSON.parse(savedColumns));
    }
  }, [currentBoardId]);

  const saveColumnOrderToLocalStorage = (columns) => {
    localStorage.setItem(currentBoardId, JSON.stringify(columns));
  };

  return { localColumns, setLocalColumns, saveColumnOrderToLocalStorage };
};

export default useCardsOrder;