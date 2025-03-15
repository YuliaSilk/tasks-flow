import React, {useState} from "react";

import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import {IconButton} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {deleteCard, editCard} from "../../redux/cards/operations";
import DeleteDialog from "../../components/UI/ModalWindodws/DeleteDialogBasic";
import {getBoardById} from "../../redux/boards/operations";
import EditCardModal from "../../components/UI/ModalWindodws/EditCardModal";
import {Draggable} from "@hello-pangea/dnd";
import {useSnackbar} from "notistack";
import {CardComponentProps} from "../../types/interfaces";

const Card: React.FC<CardComponentProps> = ({_id: cardId, title, description, index}) => {
 const dispatch: AppDispatch = useDispatch();
 const {enqueueSnackbar} = useSnackbar();

 const [isDialogOpen, setDialogOpen] = useState(false);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);

 const columnId = useSelector((state: any) => state.boards.currentBoard?.columns[0]._id);
 const boardId = useSelector((state: any) => state.boards.currentBoard?._id);

 const openEditModal = () => {
  setIsEditModalOpen(true);
 };

 const handleDelete = async () => {
  try {
   await dispatch(deleteCard({boardId, columnId, _id: cardId})).unwrap();
   enqueueSnackbar("Card deleted successfully!", {variant: "success"});
   dispatch<any>(getBoardById(boardId));
   setDialogOpen(false);
  } catch (errror) {
   enqueueSnackbar("Error deleting card!", {variant: "error"});
  }
 };

 const handleEdit = (cardId: string, newTitle: string, newDescription: string) => {
  dispatch(editCard({boardId, columnId, _id: cardId, title: newTitle, description: newDescription})).then(() => {
   dispatch(getBoardById(boardId));
  });
 };

 return (
  <Draggable
   draggableId={cardId.toString()}
   key={cardId}
   index={index}
  >
   {(provided) => (
    <div
     {...provided.draggableProps}
     {...provided.dragHandleProps}
     ref={provided.innerRef}
     className="w-[96%] min-w-0 h-[220px] m-4 p-3 bg-background-light/60 dark:bg-primary-dark/20 rounded-lg flex flex-col gap-4 shadow-card-shadow dark:shadow-sm hover:shadow-card-hover hover:border-[1px] hover:border-primary-light/50 dark:hover:border-primary-dark/50 focus:border-[3px] focus:border-secondary-light/10 dark:focus:border-secondary-dark/10 transition-all duration-200"
    >
     <p className="font-bold text-text dark:text-text-dark text-[24px] underline">{title}</p>
     <div className="w-full h-[160px] p-1 overflow-hidden hover:cursor-pointer hover:bg-primary-main/5 focus:bg-primary-main/5 rounded-lg">
      <p className="text-text text-[16px] md:text-[18px] lg:text-[20px] font-bold"> to do:</p>
      <p className="text-text text-[16px md:text-[18px] lg:text-[20px]">{description} </p>
     </div>
     <div className="flex w-full justify-end gap-4 items-center">
      <IconButton
       onClick={openEditModal}
       className="w-8 h-8  text-text-light dark:text-text-dark  bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
      >
       <EditNoteRoundedIcon className="hover:text-secondary-light focus:text-secondary-dark" />
      </IconButton>

      <IconButton
       onClick={() => setDialogOpen(true)}
       className=" w-8 h-8  text-text-light dark:text-text-dark  hover:text-red-400 focus:text-red-600 bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-300"
      >
       <DeleteRoundedIcon className="hover:text-red-400 focus:text-red-600" />
      </IconButton>
     </div>
     <DeleteDialog
      isOpen={isDialogOpen}
      onClose={() => setDialogOpen(false)}
      title="Delete Card"
      content="Are you sure you want to delete this card?"
      onDelete={handleDelete}
     ></DeleteDialog>

     {isEditModalOpen && (
      <EditCardModal
       open={isEditModalOpen}
       onClose={() => setIsEditModalOpen(false)}
       cardId={cardId}
       title={title}
       description={description}
       onEdit={handleEdit}
       boardId={boardId}
      />
     )}
    </div>
   )}
  </Draggable>
 );
};

export default Card;
