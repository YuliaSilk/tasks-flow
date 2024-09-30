import React, {createContext, useEffect, useState} from "react";
import {BoardProps} from "../../types/types";
import {fetchBoards} from "../../redux/boards/operations";
import {useDispatch} from "react-redux";
interface BoardContextProps {
 boards: BoardProps[];
 addBoard: (board: BoardProps) => void;
 getBoardByID: (id: string) => string | undefined;
}

export const BoardContext = createContext<BoardContextProps | undefined>(undefined);

export const BoardProvider = ({children}: {children: React.ReactNode}) => {
 const dispatch = useDispatch<any>();
 const [boards, setBoards] = useState<BoardProps[]>([]);

 useEffect(() => {
  const getBoards = async () => {
   const action = await dispatch(fetchBoards());
   if (fetchBoards.fulfilled.match(action)) setBoards(action.payload);
  };
  getBoards();
 }, [dispatch]);

 const addBoard = (newBoard: BoardProps) => {
  setBoards((prevBoards) => [...prevBoards, newBoard]);
 };

 const getBoardByID = (id: string): string | undefined => {
  const board = boards.find((b) => b._id === id);
  return board ? String(board._id) : undefined;
 };

 return <BoardContext.Provider value={{boards, addBoard, getBoardByID}}>{children}</BoardContext.Provider>;
};
