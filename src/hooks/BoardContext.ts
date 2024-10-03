// import { createContext, useState, useEffect } from 'react';
// import { BoardProps } from '../types/types';

// import { fetchBoards } from '../redux/boards/operations';

// interface BoardContextProps {
//   boards: BoardProps[];
//   addBoard: (board: BoardProps) => void;
//   getCurrentBoardByID: (id: string) => string | undefined;
// }

// export const BoardContext = createContext<BoardContextProps | undefined>(undefined);

// export const BoardProvider = ({ children }: { children: React.ReactNode }) => {
//   const [boards, setBoards] = useState<BoardProps[]>([]);
//   const [currentBoard, setCurrentBoard] = useState<BoardProps | null>(null);

//   useEffect(() => {
//     // Fetch boards data from API or database
//     const getBoards = async () => {
//       const boardsData = await fetchBoards();
//       console.log("DATA: ", boardsData);
//       setBoards(boardsData);
//     };
//     getBoards();
//   }, []);

//   const addBoard = (newBoard: BoardProps) => {
//     setBoards((prevBoards) => [...prevBoards, newBoard]);
//   };

//   const getCurrentBoardByID = (id: string): string | undefined => {
//     const board = boards.find((b) => b._id === id);
//     return board ? String(board._id) : undefined;
//   };

//   const selectBoard = (id: string) => {
//     const selectedBoard = boards.find((b) => b._id === id);
//     setCurrentBoard(selectedBoard);
//   };

//   return (
//     <BoardContext.Provider
//       value={{
//         boards,
//         addBoard,
//         getCurrentBoardByID,
//         selectBoard,
//         currentBoard,
//       }}
//     >
//       {children}
//     </BoardContext.Provider>
//   );
// };