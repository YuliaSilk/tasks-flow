import React, {useState} from "react";

import {CardProps} from "../../types/interfaces";
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

 const card: CardProps = useSelector((state: any) => state.cards.cards.find((c) => c._id === cardId));
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
     className="w-[260px] md:w-[280px] lg:w-[340px] h-[220px] p-3 bg-white rounded-lg flex flex-col gap-4 border-solid border-[1px] border-secondary shadow-card-shadow hover:border-[3px] hover:border-primary-main/10 focus:border-[3px] focus:border-primary-main/10 transition-all duration-200"
    >
     <h3 className="text-primary-tertiary text-[24px] font-bold">
      {" "}
      <span className="font-light">My task:</span> {card?.title}
     </h3>
     <div className="w-full h-[160px] p-1 overflow-hidden hover:cursor-pointer hover:bg-primary-main/5 focus:bg-primary-main/5 rounded-lg">
      <p className="text-text text-[16px] font-bold"> What I want to do:</p>
      <p className="text-text text-[16px]">{card?.description} </p>
     </div>
     <div className="flex w-full justify-end gap-4 items-center">
      <IconButton
       onClick={openEditModal}
       className="w-8 h-8 text-primary-main hover:text-primary-secondary focus:text-primary-secondary bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
      >
       <EditNoteRoundedIcon />
      </IconButton>

      <IconButton
       onClick={() => setDialogOpen(true)}
       className=" w-8 h-8  text-primary-main  hover:text-primary-red focus:text-primary-red bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
      >
       <DeleteRoundedIcon />
      </IconButton>
     </div>
     <DeleteDialog
      isOpen={isDialogOpen}
      onClose={() => setDialogOpen(false)}
      title="Delete Card"
      onClick={handleDelete}
     >
      <p>Are you sure you want to delete this card?</p>
     </DeleteDialog>
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
