import React, {useState} from "react";
import ButtonAdd from "../UI/Buttons/ButtonAdd";
import ButtonLoad from "../UI/Buttons/ButtonLoad";
import SearchField from "../UI/SearchField";
import {useDispatch} from "react-redux";
import {getBoardById} from "../../redux/boards/operations";
import {AppDispatch} from "../../redux/store";

const Header: React.FC = () => {
 const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);
 const dispatch = useDispatch<AppDispatch>();
 const handleBoardSelected = (boardId: string) => {
  setSelectedBoardId(boardId);
 };

 const handleLoadBoard = () => {
  if (selectedBoardId) {
   dispatch(getBoardById(selectedBoardId));
  }
 };

 return (
  <>
   <h1 className="text-primary-accent text-[48px] font-bold">Tasks Flow</h1>
   <div className="flex gap-4">
    <SearchField onBoardSelected={handleBoardSelected} />
    <ButtonLoad onClick={handleLoadBoard} />
    <ButtonAdd
    // onClick={handleAddCard}
    />
   </div>
  </>
 );
};
export default Header;
