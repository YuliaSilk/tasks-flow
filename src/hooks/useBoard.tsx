import {useContext} from "react";
import {BoardContext} from "../components/Board/BoardContext";
export const useBoards = () => {
 const context = useContext(BoardContext);
 if (!context) {
  throw new Error("useBoards must be used within a BoardProvider");
 }
 return context;
};
