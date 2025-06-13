import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteBoard, fetchBoards} from "../../redux/boards/operations";
import {BoardProps, BoardsState, SearchFieldProps} from "../../types/interfaces";
import {AppDispatch} from "../../redux/store";
import DeleteDialog from "../UI/ModalWindodws/DeleteDialogBasic";
import {useSnackbar} from "notistack";
import Select, {OptionProps} from "react-select";
import getSelectStyles from "../../styles/selectStyles";

// Тип для опцій
interface BoardOptionType {
 value: string;
 label: string;
}

const SearchComponent = ({onBoardSelected, theme}: SearchFieldProps) => {
 const dispatch = useDispatch<AppDispatch>();
 const {enqueueSnackbar} = useSnackbar();

 const [isDialogOpen, setDialogOpen] = useState(false);
 const [selectedBoard, setSelectedBoard] = React.useState<BoardProps | null>(null);
 const [boardToDelete, setBoardToDelete] = useState<BoardProps | null>(null);

 const boards = useSelector((state: {boards: BoardsState}) => state.boards.boards);

 useEffect(() => {
  dispatch(fetchBoards());
 }, [dispatch]);

 const filteredBoards = boards;

 const handleDeleteBoard = async (boardId: string) => {
  try {
   await dispatch(deleteBoard(boardId)).unwrap();
   enqueueSnackbar("Board deleted successfully!", {variant: "success"});
   dispatch(fetchBoards());
   // Якщо видалили вибрану дошку — скидаємо вибір
   if (selectedBoard && selectedBoard._id === boardId) {
    setSelectedBoard(null);
   }
  } catch (error) {
   console.error("Error deleting board:", error);
   enqueueSnackbar("Error deleting board!", {variant: "error"});
  }
 };

 // Ensure theme is only 'light' or 'dark'
 const selectTheme = theme === "dark" ? "dark" : "light";

 // Кастомний компонент опції з іконкою видалення
 const CustomOption = (props: OptionProps<BoardOptionType>) => {
  const {data, innerProps, isFocused, isSelected} = props;
  return (
   <div
    {...innerProps}
    className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer select-none ${
     isFocused ? (selectTheme === "dark" ? "bg-[#2E2E2E]" : "bg-[#F5F5F5]") : ""
    } ${isSelected ? (selectTheme === "dark" ? "bg-[#fd14b6] text-[#050e1a]" : "bg-[#e802a3] text-white") : ""}`}
    style={{position: "relative"}}
   >
    <span>{data.label}</span>
    <button
     type="button"
     className="ml-2 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900"
     onClick={(e) => {
      e.stopPropagation();
      setBoardToDelete(boards.find((b) => b._id === data.value) || null);
      setDialogOpen(true);
     }}
     tabIndex={0}
     aria-label="Delete board"
    >
     <svg
      width="18"
      height="18"
      fill="currentColor"
      className="text-red-500 hover:text-red-700"
     >
      <use href="/images/sprite.svg#icon-trash" />
     </svg>
    </button>
   </div>
  );
 };

 return (
  <div className="relative w-[300px] overflow-hidden">
   <Select<BoardOptionType, false>
    key={theme}
    isSearchable
    isClearable
    placeholder="Search for a board..."
    value={selectedBoard ? {value: selectedBoard._id, label: selectedBoard.title} : null}
    options={filteredBoards.map((board) => ({
     value: board._id,
     label: board.title,
    }))}
    onChange={(newValue) => {
     if (newValue && typeof newValue === "object" && "value" in newValue && "label" in newValue) {
      const selectedBoard = filteredBoards.find((board) => board._id === (newValue as BoardOptionType).value);
      if (selectedBoard) {
       setSelectedBoard(selectedBoard);
       onBoardSelected(selectedBoard._id);
      } else {
       setSelectedBoard(null);
      }
     } else {
      setSelectedBoard(null);
     }
    }}
    className={`w-full h-auto rounded-[20px] z-[999] max-h-[200px] overflow-y-auto ${
     selectTheme === "dark" ? "bg-background-dark text-text-dark" : "bg-background-light text-text-light"
    }`}
    menuPortalTarget={document.body}
    styles={getSelectStyles(selectTheme)}
    components={{Option: CustomOption}}
   />

   <DeleteDialog
    isOpen={isDialogOpen}
    onClose={() => setDialogOpen(false)}
    title="Delete Board"
    content="Are you sure you want to delete this board?"
    onDelete={() => {
     if (boardToDelete) {
      handleDeleteBoard(boardToDelete._id);
      setBoardToDelete(null);
     }
     setDialogOpen(false);
    }}
   />
  </div>
 );
};
export default SearchComponent;
