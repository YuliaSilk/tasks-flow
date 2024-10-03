// import React, {createContext, useEffect, useState} from "react";
// import {BoardProps} from "../../types/types";
// import {fetchBoards} from "../../redux/boards/operations";
// import {useDispatch} from "react-redux";
// interface BoardContextProps {
//  boards: BoardProps[];
//  addBoard: (board: BoardProps) => void;
//  getCurrentBoardByID: (id: string) => string | undefined;
// }

// export const BoardContext = createContext<BoardContextProps | undefined>(undefined);

// export const BoardProvider = ({children}: {children: React.ReactNode}) => {
//  const dispatch = useDispatch<any>();
//  const [boards, setBoards] = useState<BoardProps[]>([]);

//  useEffect(() => {
//   const getBoards = async () => {
//    const action = await dispatch(fetchBoards());
//    if (fetchBoards.fulfilled.match(action)) setBoards(action.payload);
//   };
//   getBoards();
//  }, [dispatch]);

//  const addBoard = (newBoard: BoardProps) => {
//   setBoards((prevBoards) => [...prevBoards, newBoard]);
//  };

//  const getCurrentBoardByID = (id: string): string | undefined => {
//   const board = boards.find((b) => b._id === id);
//   return board ? String(board._id) : undefined;
//  };

//  return <BoardContext.Provider value={{boards, addBoard, getCurrentBoardByID}}>{children}</BoardContext.Provider>;
// };

// import React from "react";
// import {useState, useEffect} from "react";
// import {BoardProps} from "../../types/types";
// import {fetchBoards} from "../../redux/boards/operations";
// import {unwrapResult} from "@reduxjs/toolkit";

// interface BoardContextProps {
//  boards: BoardProps[];
//  currentBoard: {
//   columns: any[];
//  };
// }

// const BoardContext = React.createContext<BoardContextProps>({
//  boards: [],
//  currentBoard: {
//   columns: [],
//  },
// });

// export const BoardProvider = ({children}: {children: React.ReactNode}) => {
//  const [boards, setBoards] = useState<BoardProps[]>([]);
//  const [currentBoard, setCurrentBoard] = useState<BoardProps | null>;
//  // const [selectedBoard, setSelectedBoard] = useState<BoardProps | null>(null);
//  useEffect(() => {
//   const getBoards = async () => {
//    const boardsData = await fetchBoards();
//    const unwrappedResult = unwrapResult(boardsData as any);
//    console.log("DATA: ", unwrappedResult);
//    setBoards(unwrappedResult);
//   };
//   getBoards();
//  }, []);

//  const addBoard = (newBoard: BoardProps) => {
//   setBoards((prevBoards) => [...prevBoards, newBoard]);
//  };

//  const getCurrentBoardByID = (id: string): string | undefined => {
//   const board = boards.find((b) => b._id === id);
//   return board ? String(board._id) : undefined;
//  };

//  const selectBoard = (id: string) => {
//   const selectedBoard = boards.find((b) => b._id === id);
//   setCurrentBoard(selectedBoard || null);
//  };

//  return (
//   <BoardContext.Provider
//    value={{
//     boards,
//     // addBoard,
//     // getCurrentBoardByID,
//     // selectBoard,
//     currentBoard,
//    }}
//   >
//    {children}
//   </BoardContext.Provider>
//  );
// };
