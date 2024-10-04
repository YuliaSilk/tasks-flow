import React from "react";

import {CardProps} from "../../types/types";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {deleteCard} from "../../redux/cards/operations";
// import CardModal from "../CardModal/CardModal";

interface CardComponentProps extends CardProps {
 _id: string;
 title: string;
 description: string;
 onEdit: (_id: string) => void;
 onDelete: (_id: string) => void;
}

const Card: React.FC<CardComponentProps> = ({_id: cardId, title, description, onEdit, onDelete}) => {
 const [isOpen, setIsOpen] = React.useState(false);
 const dispatch: AppDispatch = useDispatch();
 const card: CardProps = useSelector((state: any) => state.cards.cards.find((c) => c._id === cardId));
 const columnId = useSelector((state: any) => state.boards.currentBoard?.columns[0]._id);
 const boardId = useSelector((state: any) => state.boards.currentBoard?._id);

 const openModal = () => {
  setIsOpen(true);
 };

 const handleDelete = (_id: string) => {
  dispatch(deleteCard({boardId, columnId, _id: cardId}));
  console.log(`Delete card with ID: ${_id}`);
 };

 return (
  <div className="w-[260px] md:w-[320px] lg:w-[340px] h-[200px] p-3 bg-white rounded-lg flex flex-col gap-4 border-solid border-[1px] border-secondary shadow-card-shadow">
   <h3 className="text-primary-tertiary text-[24px] font-bold">Title: {title}</h3>
   <div className="w-full h-[120px] p-1 overflow-hidden hover:cursor-pointer hover:bg-primary-main/5 focus:bg-primary-main/5 rounded-lg">
    <p className="text-text text-[16px]">What you want to do: {description}</p>
   </div>
   <div className="flex w-full justify-end gap-4 items-center">
    <Button
     onClick={openModal}
     className="w-8 h-8 text-primary-main hover:text-primary-secondary focus:text-primary-secondary bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
    >
     <EditNoteRoundedIcon />
    </Button>
    <Button
     onClick={() => handleDelete(card._id)}
     className=" w-8 h-8  text-primary-main  hover:text-primary-red focus:text-primary-red bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
    >
     <DeleteRoundedIcon />
    </Button>
   </div>
  </div>
 );
};

export default Card;
