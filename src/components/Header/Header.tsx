import React, {useState} from "react";
import ButtonAdd from "../UI/Buttons/ButtonAdd";
import ButtonLoad from "../UI/Buttons/ButtonLoad";
import {useDispatch} from "react-redux";
import {getBoardById} from "../../redux/boards/operations";
import {AppDispatch} from "../../redux/store";
import SearchComponent from "../SaerchComponent";

// import ThemeToggle from "./ThemeToggle";

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
  <div className=" w-full h-auto flex flex-col mb-20w-full  pt-4 px-4 lg:px-5 lg:mb-10 lg:flex-row  gap-4 justify-between items-center shadow-lg">
   <h1 className="text-text-light dark:text-text-dark text-[24px] md:text-[42px] lg:text-[56px] font-bold">
    Tasks Flow
   </h1>
   <div className="flex flex-col md:flex-row gap-4 md:align-baseline items-center mb-4">
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
   <div className="lg:absolute top-24 inset-x-0 flex justify-center items-center w-full h-[20px] lg:h-[28px] bg-gradient-to-r from-accent-lite via-transparent to-accent-lte dark:from-accent-dark dark:to-accent-dark">
    <p className="font-dancing text-primary text-[18px] md:text-[24] font-bold text-center">
     Lost time is never found again
    </p>
   </div>
  </div>
 );
};
export default Header;
