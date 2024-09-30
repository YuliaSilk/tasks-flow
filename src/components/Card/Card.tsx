import React, {useEffect} from "react";

import {CardProps} from "../../types/types";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import {Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {getCardById, deleteCard} from "../../redux/cards/operations";

interface CardComponentProps extends CardProps {
 onEdit: (id: string) => void;
 onDelete: (id: string) => void;
}

const Card: React.FC<CardComponentProps> = ({_id: cardId, title, description, onEdit, onDelete}) => {
 const dispatch = useDispatch();
 const card: CardProps | undefined = useSelector((state: any) => state.cards.cards.find((c) => c.id === cardId));
 useEffect(() => {
  dispatch<any>(getCardById);
 }, [dispatch, cardId]);
 const openModal = () => {
  //   onEdit(cardId);
 };
 //  const handleEdit = (id: string) => {
 //   console.log(`Edit card with ID: ${id}`);
 //   onEdit(id);
 //  };

 const handleDelete = (id: string) => {
  dispatch<any>(deleteCard);
 };

 if (!card) {
  return <div>Loading...</div>;
 }

 return (
  <div className="w-[260px] md:w-[320px] lg:w-[340px] h-[200px] p-3 bg-white rounded-lg flex flex-col gap-4  border-solid border-[1px] border-secondary shadow-card-shadow">
   <h3 className="text-primary-tertiary text-[24px] font-bold">{title}</h3>
   <div className="w-full h-[120px] p-1 overflow-hidden hover:cursor-pointer hover:bg-primary-main/5 focus:bg-primary-main/5 rounded-lg">
    <p className="text-text text-[16px]">{description}</p>
   </div>
   <div className="flex w-full justify-end gap-4 items-center">
    <Button
     onClick={openModal}
     className="w-8 h-8 text-primary-main hover:text-primary-secondary focus:text-primary-secondary bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
    >
     <EditNoteRoundedIcon />
    </Button>
    <Button
     onClick={() => handleDelete}
     className=" w-8 h-8  text-primary-main  hover:text-primary-red focus:text-primary-red bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
    >
     <DeleteRoundedIcon />
    </Button>
   </div>
  </div>
 );
};

export default Card;
