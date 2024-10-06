import React, {useState} from "react";
import ButtonAdd from "../UI/Buttons/ButtonAdd";
import ButtonLoad from "../UI/Buttons/ButtonLoad";
import {useDispatch} from "react-redux";
import {getBoardById} from "../../redux/boards/operations";
import {AppDispatch} from "../../redux/store";
import SearchComponent from "../SaerchComponent";

const Header: React.FC = () => {
 const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
 const dispatch = useDispatch<AppDispatch>();
 const handleBoardSelected = (boardId: string) => {
  setSelectedBoardId(boardId);
 };

 const handleLoadBoard = () => {
  if (selectedBoardId === null) {
   throw new Error("selectedBoardId is null in handleLoadBoard");
  }
  if (selectedBoardId) {
   dispatch(getBoardById(selectedBoardId));
  }
 };

 return (
  <div className="w-full h-[120px]  flex flex-col gap-4">
   <div className="p-5 w-full h-[80px] flex  gap-4 justify-between items-center">
    <h1 className="text-primary-accent text-[48px] font-bold">Tasks Flow</h1>
    <div className="flex gap-4">
     <SearchComponent onBoardSelected={handleBoardSelected} />
     <ButtonLoad onClick={handleLoadBoard} />
     <ButtonAdd
      actionType="board"
      title="Create new board"
      columnId=""
      boardId=""
     />
    </div>
   </div>
   <div className="reletive w-full h-[28px] bg-gradient-to-r from-primary-tertiary via-transparent to-primary-tertiary">
    <p className="abolute inset-x-0 bottom-1 text-primary-tertiary text-[18px] font-bold text-center">
     Lost time is never found again
    </p>
   </div>
  </div>
 );
};
export default Header;
