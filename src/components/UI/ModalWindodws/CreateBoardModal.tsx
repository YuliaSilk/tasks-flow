import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createBoard} from "../../../redux/boards/operations";
import BaseModal from "./BaseModal";
import {Button, TextField, Typography} from "@mui/material";
const CreateBoardModal: React.FC<{isOpen: boolean; onClose: () => void}> = ({isOpen, onClose}) => {
 const [boardTitle, setBoardTitle] = useState("");
 const dispatch = useDispatch();

 const handleCreateBoard = () => {
  dispatch<any>(
   createBoard({
    title: boardTitle,
    columns: [],
   })
  );

  onClose();
 };

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
     >
      Create New Board
     </Typography>
     <div className="flex flex-col gap-4 mb-5">
      <TextField
       label="Enter your new board title"
       variant="standard"
       placeholder="Enter your new board title"
       value={boardTitle}
       onChange={(e) => setBoardTitle(e.target.value)}
      ></TextField>
     </div>
     <div className="flex flex-end gap-4 justify-between">
      <Button onClick={handleCreateBoard}>Create</Button>
      <Button onClick={onClose}>Close</Button>
     </div>
    </BaseModal>
   </div>
  </div>
 );
};

export default CreateBoardModal;
