import React, {useState, useEffect} from "react";
import BaseModal from "./BaseModal";
import {Typography, TextField, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createCard} from "../../../redux/cards/operations";
import {getBoardById} from "../../../redux/boards/operations";
import {useSnackbar} from "notistack";
import {CreateCardModalProps} from "../../../types/interfaces";

const CreateCardModal: React.FC<CreateCardModalProps> = ({open, onClose, columnId, boardId}) => {
 const dispatch = useDispatch();
 const {enqueueSnackbar} = useSnackbar();
 const [cardTitle, setCardTitle] = useState("");
 const [cardDescription, setCardDescription] = useState("");
 const [titleError, setTitleError] = useState("");

 const cards = useSelector(
  (state: any) => state.boards.currentBoard?.columns.find((col) => col._id === columnId)?.cards || []
 );

 useEffect(() => {
  setTitleError("");
 }, [cardTitle]);

 const handleCreateCard = async () => {
  try {
   if (!cardTitle || !cardDescription) {
    enqueueSnackbar("Please enter both a card title and description.", {variant: "error"});
    return;
   }
   const isDuplicateTitle = cards.some((card: {title: string}) => card.title.toLowerCase() === cardTitle.toLowerCase());

   if (isDuplicateTitle) {
    setTitleError("A card with this title already exists!");
    return;
   }
   if (cardTitle.length > 50) {
    enqueueSnackbar("Card title must be less than 50 characters.", {variant: "error"});
    return;
   }
   if (cardDescription.length > 500) {
    enqueueSnackbar("Card description must be less than 500 characters.", {variant: "error"});
    return;
   }
   await dispatch<any>(
    createCard({
     title: cardTitle,
     description: cardDescription,
     columnId,
     boardId,
    })
   ).unwrap();
   enqueueSnackbar("Card created successfully!", {variant: "success"});
   dispatch<any>(getBoardById(boardId));
   setCardTitle("");
   setCardDescription("");
   onClose();
   if (!open) return null;
  } catch (error) {
   enqueueSnackbar("Error creating card!", {variant: "error"});
  }
 };

 return (
  <BaseModal
   open={open}
   onClose={onClose}
  >
   <Typography
    variant="h6"
    gutterBottom
   >
    Create New Card
   </Typography>
   <div className="flex flex-col gap-4 mb-5">
    <TextField
     label="Card Title"
     variant="standard"
     fullWidth
     value={cardTitle}
     onChange={(e) => setCardTitle(e.target.value)}
     error={!!titleError}
     helperText={titleError}
     InputProps={{
      className: "text-text-light dark:text-text-dark text-[14px] md:text-[16px] lg:text-[18px]",
     }}
     InputLabelProps={{
      className: "text-gray-700 dark:text-gray-300 text-[14px] md:text-[20px] lg:text-[24px]",
     }}
    />
    <TextField
     label="Card Description"
     variant="standard"
     fullWidth
     value={cardDescription}
     onChange={(e) => setCardDescription(e.target.value)}
     InputProps={{
      className: "text-black dark:text-white",
     }}
     InputLabelProps={{
      className: "text-gray-700 dark:text-gray-300",
     }}
    />
   </div>
   <div className="flex justify-between">
    <Button
     variant="contained"
     color="primary"
     onClick={handleCreateCard}
    >
     Create
    </Button>
    <Button
     variant="outlined"
     onClick={onClose}
    >
     Close
    </Button>
   </div>
  </BaseModal>
 );
};

export default CreateCardModal;
