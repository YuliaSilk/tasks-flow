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
  <div className=" w-full h-auto flex flex-col mb-20w-full  pt-4 px-4 lg:px-5 lg:mb-10 lg:flex-row  gap-4 justify-between items-center">
   <h1 className="text-primary-accent text-[24px] md:text-[36px] lg:text-[48px] font-bold">Tasks Flow</h1>
   <div className="flex flex-col md:flex-row gap-4 md:align-baseline items-center mb-4">
    <SearchComponent onBoardSelected={handleBoardSelected} />
    <ButtonLoad onClick={handleLoadBoard} />
    <ButtonAdd
     actionType="board"
     title="Create new board"
     columnId=""
     boardId=""
    />
   </div>
   <div className="lg:absolute top-24 inset-x-0 flex justify-center items-center w-full h-[20px] lg:h-[28px] bg-gradient-to-r from-primary-tertiary via-transparent to-primary-tertiary">
    <p className=" text-primary-tertiary text-[18px] font-bold text-center">Lost time is never found again</p>
   </div>
  </div>
 );
};
export default Header;
