import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createBoard, fetchBoards} from "../../../redux/boards/operations";
import BaseModal from "./BaseModal";
import {Button, TextField, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {AppDispatch} from "../../../redux/store";

const CreateBoardModal: React.FC<{isOpen: boolean; onClose: () => void}> = ({isOpen, onClose}) => {
 const dispatch = useDispatch<AppDispatch>();
 const {enqueueSnackbar} = useSnackbar();

 const [error, setError] = useState("");
 const [boardTitle, setBoardTitle] = useState("");

 const boards = useSelector((state: any) => state.boards.boards);

 const handleCreateBoard = async () => {
  try {
   const isDuplicate = boards.some((board: {title: string}) => board.title === boardTitle.trim());
   if (isDuplicate) {
    setError("A board with this title already exists. Please choose another title.");
    return;
   }
   await dispatch<any>(
    createBoard({
     title: boardTitle,
     columns: [],
    })
   );
   dispatch(fetchBoards());
   setBoardTitle("");
   enqueueSnackbar("Board created successfully!", {variant: "success"});
   onClose();
  } catch (error) {
   enqueueSnackbar("Error creating board!", {variant: "error"});
  }
 };
 useEffect(() => {
  setError("");
 }, [boardTitle]);
 if (!isOpen) return null;

 return (
  <div className="modal">
   <div className="modal-content">
    <BaseModal
     open={isOpen}
     onClose={onClose}
    >
     <Typography
      variant="h6"
      component="h2"
      sx={{textAlign: "center", textTransform: "capitalize", fontSize: "1.5rem"}}
     >
      Create New Board
     </Typography>
     <div className="flex flex-col gap-4 mb-5 text-text-light dark:text-text-dark">
      <TextField
       label="Enter your new board title"
       variant="standard"
       placeholder="Enter your new board title"
       value={boardTitle}
       onChange={(e) => setBoardTitle(e.target.value)}
       error={!!error}
       helperText={error}
       key={boardTitle.length}
       className="text-text-light dark:text-text-dark"
      ></TextField>
     </div>
     <div className="flex flex-end gap-4 justify-between">
      <Button
       onClick={handleCreateBoard}
       className="bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark p-1 rounded-[20px] hover:bg-primary-light/10 hover:dark:bg-primary-dark/10 hover:border-primary-light dark:hover:border-primary-dark hover:border-1 hover:border-solid hover:text-primary-light dark:hover:text-primary-dark transition-all duration-200"
      >
       Create
      </Button>
      <Button
       onClick={onClose}
       className="bg-primary-light dark:bg-primary-dark text-text-light dark:text-text-dark p-1 rounded-[20px] hover:bg-primary-light/10 hover:dark:bg-primary-dark/10 hover:border-primary-light dark:hover:border-primary-dark hover:border-1 hover:border-solid hover:text-primary-light dark:hover:text-primary-dark transition-all duration-200"
      >
       Close
      </Button>
     </div>
    </BaseModal>
   </div>
  </div>
 );
};

export default CreateBoardModal;
