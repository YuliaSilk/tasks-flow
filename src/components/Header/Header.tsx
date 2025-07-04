import React from "react";
// import ButtonLoad from "../UI/Buttons/ButtonLoad";
import ButtonAdd from "../UI/Buttons/ButtonAdd";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {getBoardById} from "../../redux/boards/operations";
import SearchComponent from "../SearchComponent/SaerchComponent";
import {HeaderProps} from "../../types/interfaces";

const Header: React.FC<HeaderProps> = ({theme, setTheme}) => {
 const dispatch = useDispatch<AppDispatch>();

 const handleBoardSelected = (boardId: string) => {
  if (boardId) {
   dispatch(getBoardById(boardId));
  }
 };

 return (
  <div className=" w-full h-auto md:h-[160px] flex flex-col mb-10 lg:flex-row  gap-4 justify-between items-center">
   <h1 className="hidden">Tasks Flow - your personal task manager</h1>
   <div className="flex flex-col md:flex-row gap-4 items-center md:mb-4 w-full  p-4 md:p-5 lg:px-44">
    <img
     src="/images/tasks-flow-logo-min.png"
     alt="Tasks Flow Logo"
     className="w-[160px] md:w-[160px] h-[auto]"
    />
    <div className="flex flex-col md:flex-row gap-4 lg:gap-8 w-full items-center justify-center md:justify-end mb-4">
     <div className="flex flex-col md:flex-row items-center  w-[480px] gap-4  ">
      <SearchComponent
       onBoardSelected={handleBoardSelected}
       theme={theme}
      />
      {/* <ButtonLoad onClick={handleLoadBoard} /> */}
     </div>
     <div className="flex flex-col md:flex-row items-center  w-[180px]  ">
      <ButtonAdd
       actionType="board"
       title="Create new board"
       columnId=""
       boardId=""
      />
     </div>
     <div
      className="cursor-pointer"
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
     >
      {theme === "light" ? (
       <svg
        width="24px"
        height="24px"
        fill="#461CE2"
        className="hover:fill-secondary-light dark:hover:fill-secondary-dark transition-all duration-200"
       >
        <use href="/images/sprite.svg#icon-moon" />
       </svg>
      ) : (
       <svg
        width="24px"
        height="24px"
        fill="#B3ABF9"
        className="hover:fill-secondary-light dark:hover:fill-secondary-dark transition-all duration-200"
       >
        <use href="/images/sprite.svg#icon-sun" />
       </svg>
      )}
     </div>
    </div>
   </div>
   <div
    className="lg:absolute top-[128px] inset-x-0 flex justify-center items-center w-full h-[20px] lg:h-[28px] 
bg-gradient-to-r from-accent-light via-transparent to-accent-light dark:from-accent-dark/50 dark:via-transparent dark:to-accent-dark/50 shadow-lg"
   >
    <p className="font-dancing text-primary text-[18px] md:text-[24px]  xl:text-[32px] font-normal text-center">
     Lost time is never found again
    </p>
   </div>
  </div>
 );
};

export default Header;
