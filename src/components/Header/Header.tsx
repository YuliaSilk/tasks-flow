import React, {useState} from "react";
import ButtonAdd from "../UI/Buttons/ButtonAdd";
import ButtonLoad from "../UI/Buttons/ButtonLoad";
// import SearchField from "../UI/SearchField";
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
  <div className="w-full h-[80px] p-5 bg-cyan-400 rounded-lg flex justify-between items-center">
   <h1 className="text-primary-accent text-[48px] font-bold">Tasks Flow</h1>
   <div className="flex gap-4">
    <SearchComponent onBoardSelected={handleBoardSelected} />
    <ButtonLoad onClick={handleLoadBoard} />
    <ButtonAdd />
   </div>
  </div>
 );
};
export default Header;
