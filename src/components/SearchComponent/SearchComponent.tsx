import React, {useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteBoard, fetchBoards, getBoardById} from "../../redux/boards/operations";
import {BoardProps, BoardsState, SearchFieldProps} from "../../types/interfaces";
import {AppDispatch} from "../../redux/store";
import {useSnackbar} from "notistack";
import Select, {FormatOptionLabelContext, SelectInstance} from "react-select";
import getSelectStyles from "../../styles/selectStyles";
import ModalWrapper from "../UI/ModalWindodws/ModalWrapper";
import {DeleteDialog} from "../UI/ModalWindodws";
import {clearCurrentBoard} from "../../redux/boards/slice";

// Тип для опцій
interface BoardOptionType {
 value: string;
 label: string;
}

const SearchComponent: React.FC<SearchFieldProps> = ({onBoardSelected, theme}) => {
 const dispatch = useDispatch<AppDispatch>();
 const boards = useSelector((state: {boards: BoardsState}) => state.boards.boards);
 const currentBoard = useSelector((state: {boards: BoardsState}) => state.boards.currentBoard);
 const {enqueueSnackbar} = useSnackbar();
 const selectRef = useRef<SelectInstance<BoardOptionType>>(null);
 const [selectedOption, setSelectedOption] = useState<BoardOptionType | null>(null);

 const [isDialogOpen, setIsDialogOpen] = useState(false);
 const [boardToDelete, setBoardToDelete] = useState<BoardProps | null>(null);

 useEffect(() => {
  dispatch(fetchBoards());
 }, [dispatch]);

 useEffect(() => {
  if (currentBoard && (!selectedOption || selectedOption.value !== currentBoard._id)) {
   const option = {
    value: currentBoard._id,
    label: currentBoard.title,
   };
   setSelectedOption(option);
  }
 }, [currentBoard, selectedOption]);

 const handleDeleteBoard = async (boardId: string) => {
  try {
   await dispatch(deleteBoard(boardId));
   dispatch(clearCurrentBoard());
   await dispatch(fetchBoards());
   setSelectedOption(null);
   enqueueSnackbar("Board deleted successfully!", {variant: "success"});
  } catch (error) {
   console.error("Error deleting board:", error);
   enqueueSnackbar("Error deleting board!", {variant: "error"});
  }
 };

 const handleDelete = () => {
  if (boardToDelete) {
   handleDeleteBoard(boardToDelete._id);
   setBoardToDelete(null);
  }
  setIsDialogOpen(false);
 };

 const handleDeleteClick = (e: React.MouseEvent, data: BoardOptionType) => {
  e.stopPropagation();
  const board = boards.find((b) => b._id === data.value);
  if (board) {
   setBoardToDelete(board);
   setIsDialogOpen(true);
  }
 };

 const formatOptionLabel = ({value, label}: BoardOptionType, {context}: {context: FormatOptionLabelContext}) => {
  // Показуємо кнопку видалення тільки у випадаючому списку
  if (context === "menu") {
   return (
    <div className="flex justify-between items-center w-full">
     <span>{label}</span>
     <button
      className="text-red-500 hover:text-red-700 focus:outline-none"
      onClick={(e) => handleDeleteClick(e, {value, label})}
      aria-label={`Delete board ${label}`}
     >
      Delete
     </button>
    </div>
   );
  }
  return label;
 };

 const selectTheme = theme === "dark" ? "dark" : "light";

 const handleChange = async (newValue: BoardOptionType | null) => {
  setSelectedOption(newValue);
  if (newValue) {
   try {
    await dispatch(getBoardById(newValue.value)).unwrap();
    onBoardSelected(newValue.value);
   } catch (error) {
    console.error("Error loading board:", error);
    enqueueSnackbar("Error loading board!", {variant: "error"});
   }
  } else {
   dispatch(clearCurrentBoard());
  }
 };

 return (
  <div className="w-full max-w-md">
   <label
    id="board-select-label"
    className="sr-only"
   >
    Select a board
   </label>
   <Select<BoardOptionType>
    ref={selectRef}
    value={selectedOption}
    options={boards.map((board) => ({
     value: board._id,
     label: board.title,
    }))}
    onChange={handleChange}
    formatOptionLabel={formatOptionLabel}
    styles={getSelectStyles(selectTheme)}
    placeholder="Select a board..."
    isClearable
    aria-labelledby="board-select-label"
    aria-label="Select a board"
    inputId="board-select-input"
    classNamePrefix="board-select"
    isSearchable
    noOptionsMessage={() => "No boards found"}
    loadingMessage={() => "Loading boards..."}
   />

   {isDialogOpen && (
    <ModalWrapper>
     <DeleteDialog
      isOpen={isDialogOpen}
      onClose={() => setIsDialogOpen(false)}
      title="Delete Board"
      content="Are you sure you want to delete this board?"
      onDelete={handleDelete}
     />
    </ModalWrapper>
   )}
  </div>
 );
};

export default SearchComponent;
