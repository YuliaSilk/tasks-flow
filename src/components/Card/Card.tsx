import React, {useState} from "react";

import {CardProps} from "../../types/types";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {deleteCard, editCard} from "../../redux/cards/operations";
import DeleteDialog from "../../components/UI/ModalWindodws/DeleteDialogBasic";
import {getBoardById} from "../../redux/boards/operations";
import EditCardModal from "../../components/UI/ModalWindodws/EditCardModal";

interface CardComponentProps extends CardProps {
 _id: string;
 title: string;
 description: string;
 onEdit: (_id: string) => void;
 onDelete: (_id: string) => void;
 open: () => void;
}

const Card: React.FC<CardComponentProps> = ({_id: cardId, title, description, onEdit, onDelete}) => {
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const [isDialogOpen, setDialogOpen] = useState(false);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);

 const dispatch: AppDispatch = useDispatch();
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const card: CardProps = useSelector((state: any) => state.cards.cards.find((c) => c._id === cardId));
 const columnId = useSelector((state: any) => state.boards.currentBoard?.columns[0]._id);
 const boardId = useSelector((state: any) => state.boards.currentBoard?._id);

 const openEditModal = () => {
  setIsEditModalOpen(true);
 };

 const handleDelete = () => {
  dispatch(deleteCard({boardId, columnId, _id: cardId})).then(() => {
   dispatch<any>(getBoardById(boardId));
  });
  console.log(`Delete card with ID: ${cardId}`);

  setDialogOpen(false);
 };

 const handleEdit = (cardId: string, newTitle: string, newDescription: string) => {
  dispatch(editCard({boardId, columnId, _id: cardId, title: newTitle, description: newDescription})).then(() => {
   dispatch(getBoardById(boardId));
  });
 };

 return (
  <div className="w-[260px] md:w-[320px] lg:w-[340px] h-[200px] p-3 bg-white rounded-lg flex flex-col gap-4 border-solid border-[1px] border-secondary shadow-card-shadow">
   <h3 className="text-primary-tertiary text-[24px] font-bold">Title: {title}</h3>
   <div className="w-full h-[120px] p-1 overflow-hidden hover:cursor-pointer hover:bg-primary-main/5 focus:bg-primary-main/5 rounded-lg">
    <p className="text-text text-[16px]">What you want to do: {description}</p>
   </div>
   <div className="flex w-full justify-end gap-4 items-center">
    <Button
     onClick={openEditModal}
     className="w-8 h-8 text-primary-main hover:text-primary-secondary focus:text-primary-secondary bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
    >
     <EditNoteRoundedIcon />
    </Button>

    <Button
     onClick={() => setDialogOpen(true)}
     className=" w-8 h-8  text-primary-main  hover:text-primary-red focus:text-primary-red bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
    >
     <DeleteRoundedIcon />
    </Button>
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
   )}{" "}
  </div>
 );
};

export default Card;
