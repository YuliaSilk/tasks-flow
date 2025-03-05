import React, {useState} from "react";
import ButtonAdd from "../UI/Buttons/ButtonAdd";
import ButtonLoad from "../UI/Buttons/ButtonLoad";
import {useDispatch} from "react-redux";
import {getBoardById} from "../../redux/boards/operations";
import {AppDispatch} from "../../redux/store";
import SearchComponent from "../SaerchComponent";

interface HeaderProps {
 theme: string;
 setTheme: React.Dispatch<React.SetStateAction<string>>;
}
const Header: React.FC<HeaderProps> = ({theme, setTheme}) => {
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
  <div className=" w-full h-auto md:h-[160px] flex flex-col mb-10 lg:flex-row  gap-4 justify-between items-center">
   <h1 className="hidden">Tasks Flow - your personal task manager</h1>
   <div className="flex flex-col md:flex-row gap-4 items-center md:mb-4 w-full  p-4 md:p-5">
    <img
     src="/images/tasks-flow-logo-min.png"
     alt="Tasks Flow Logo"
     className="w-[160px] md:w-[160px] h-[auto]"
    />
    <div className="flex flex-col md:flex-row gap-4 lg:gap-8 w-full items-center justify-center mb-4">
     <SearchComponent onBoardSelected={handleBoardSelected} />
     <ButtonLoad onClick={handleLoadBoard} />
     <ButtonAdd
      actionType="board"
      title="Create new board"
      columnId=""
      boardId=""
     />
     <div
      className="cursor-pointer"
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
     >
      {theme === "light" ? (
       <svg
        width="24"
        height="24"
       >
        <use href="/images/sprite.svg#icon-moon" />
       </svg>
      ) : (
       <svg
        width="24"
        height="24"
       >
        <use href="/images/sprite.svg#icon-sun" />
       </svg>
      )}
     </div>
    </div>
   </div>
   <div
    className="lg:absolute top-[128px] inset-x-0 flex justify-center items-center w-full h-[20px] lg:h-[28px] 
bg-gradient-to-r from-accent-light via-transparent to-accent-light dark:from-accent-dark dark:via-transparent dark:to-accent-dark shadow-lg"
   >
    <p className="font-dancing text-primary text-[18px] md:text-[24px]  xl:text-[32px] font-bold text-center">
     Lost time is never found again
    </p>
   </div>
  </div>
 );
};
export default Header;
