import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteBoard, fetchBoards} from "../../redux/boards/operations";
import {BoardProps, BoardsState, SearchFieldProps} from "../../types/interfaces";
import {AppDispatch} from "../../redux/store";
import {useSnackbar} from "notistack";
import Select from "react-select";
import getSelectStyles from "../../styles/selectStyles";
import ModalWrapper from "../UI/ModalWindodws/ModalWrapper";
import {DeleteDialog} from "../UI/ModalWindodws";

// Тип для опцій
interface BoardOptionType {
 value: string;
 label: string;
}

const SearchComponent: React.FC<SearchFieldProps> = ({onBoardSelected, theme}) => {
 const dispatch = useDispatch<AppDispatch>();
 const boards = useSelector((state: {boards: BoardsState}) => state.boards.boards);
 const {enqueueSnackbar} = useSnackbar();

 const [isDialogOpen, setIsDialogOpen] = useState(false);
 const [boardToDelete, setBoardToDelete] = useState<BoardProps | null>(null);

 const handleDeleteBoard = async (boardId: string) => {
  try {
   await dispatch(deleteBoard(boardId));
   await dispatch(fetchBoards());
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
  setBoardToDelete(boards.find((b) => b._id === data.value) || null);
  setIsDialogOpen(true);
 };

 const formatOptionLabel = ({value, label}: BoardOptionType) => {
  return (
   <div className="flex justify-between items-center w-full">
    <span>{label}</span>
    <button
     className="text-red-500 hover:text-red-700 focus:outline-none"
     onClick={(e) => handleDeleteClick(e, {value, label})}
    >
     Delete
    </button>
   </div>
  );
 };

 // Ensure theme is only 'light' or 'dark'
 const selectTheme = theme === "dark" ? "dark" : "light";

 return (
  <div className="w-full max-w-md">
   <Select
    options={boards.map((board) => ({
     value: board._id,
     label: board.title,
    }))}
    onChange={(option) => {
     if (option) {
      onBoardSelected((option as BoardOptionType).value);
     }
    }}
    formatOptionLabel={formatOptionLabel}
    styles={getSelectStyles(selectTheme)}
    placeholder="Select a board..."
    isClearable
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
