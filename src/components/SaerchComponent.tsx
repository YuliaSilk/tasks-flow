import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {useDispatch, useSelector} from "react-redux";
import {deleteBoard, fetchBoards} from "../redux/boards/operations";
import {BoardProps, CardProps} from "../types/interfaces";
import {AppDispatch} from "../redux/store";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {IconButton, Typography} from "@mui/material";
import {SearchFieldProps, BoardOption} from "../types/interfaces";
import DeleteDialog from "./UI/ModalWindodws/DeleteDialogBasic";
import {useSnackbar} from "notistack";

const SearchComponent = ({onBoardSelected}: SearchFieldProps) => {
 const dispatch = useDispatch<AppDispatch>();
 const {enqueueSnackbar} = useSnackbar();

 const [isDialogOpen, setDialogOpen] = useState(false);

 const {currentBoard, boards} = useSelector((state: any) => state.boards);
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const [selectedBoard, setSelectedBoard] = React.useState<BoardProps | null>(null);
 const [boardToDelete, setBoardToDelete] = useState<string | null>(null);

 useEffect(() => {
  const getBoards = () => {
   dispatch(fetchBoards());
  };
  getBoards();
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 const handleDeleteBoard = async (boardId: string) => {
  try {
   await dispatch(deleteBoard(boardId)).unwrap();
   enqueueSnackbar("Board deleted successfully!", {variant: "success"});
   dispatch(fetchBoards());
   setSelectedBoard(null);
   onBoardSelected("");
  } catch (error) {
   enqueueSnackbar("Error deleting board!", {variant: "error"});
  }
 };

 const boardOptions: BoardOption[] = boards
  .filter(
   (
    board
   ): board is {
    title: string;
    _id: string;
    columns: {name: string; _id: string; boardId: string; cards: CardProps[]}[];
   } => Boolean(board.title && board._id)
  )
  .map((board) => ({
   title: board.title,
   _id: board._id,
   columns: board.columns.map((column) => ({...column, cards: column.cards || []})),
  }));

 const mapToBoardProps = (option: BoardOption): BoardProps => ({
  _id: option._id,
  title: option.title,
  columns: option.columns.map((column) => ({
   ...column,
   cards: column.cards || [],
   key: column._id,
  })),
 });

 return (
  <div className="w-[300px]">
   <Autocomplete
    className=" bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark rounded-[10px]"
    freeSolo
    id="free-solo-2-demo"
    disableClearable
    value={currentBoard || null}
    options={boardOptions}
    getOptionLabel={(option) => (typeof option === "string" ? option : option.title)}
    onChange={(event, value) => {
     if (value && typeof value !== "string") {
      const boardProps = mapToBoardProps(value);
      setSelectedBoard(value);
      onBoardSelected(boardProps._id);
     } else {
      setSelectedBoard(null);
      onBoardSelected("");
     }
    }}
    renderOption={(props, option) => {
     const {key, ...restOfProps} = props;
     return (
      <li
       key={key}
       {...restOfProps}
       className="p-2 flex justify-between transition-colors rounded-[20px]"
      >
       <span>{option.title}</span>
       <IconButton
        onClick={() => {
         setDialogOpen(true);
         setBoardToDelete(option._id);
        }}
       >
        <RemoveCircleOutlineIcon className="text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors" />
       </IconButton>
      </li>
     );
    }}
    renderInput={(params) => (
     <TextField
      {...params}
      label="Search your dashboard"
      className="bg-background-light dark:bg-background-dark rounded-[20px]"
      sx={{
       "& .MuiOutlinedInput-root": {
        borderRadius: "20px",
        "& fieldset": {
         border: "1px solid #89b9eb",
        },
        "&:hover fieldset": {
         border: "1px solid #89b9eb",
        },
        "&.Mui-focused fieldset": {
         border: "2px solid #89b9eb",
        },
       },
       "& .MuiInputLabel-root": {
        color: "#89b9eb",
       },
       "& .MuiInputLabel-root.Mui-focused": {
        color: "#89b9eb",
        transition: "color 0.3s",
       },
      }}
     />
    )}
   />
   <DeleteDialog
    isOpen={isDialogOpen}
    onClose={() => setDialogOpen(false)}
    title="Delete Board"
    onClick={() => {
     if (boardToDelete) {
      handleDeleteBoard(boardToDelete);
     }
     setDialogOpen(false);
    }}
   >
    <Typography>Are you sure you want to delete this board ?</Typography>
   </DeleteDialog>
  </div>
 );
};
export default SearchComponent;
