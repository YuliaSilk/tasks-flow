import React, {useState} from "react";
// import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CreateBoardModal from "../ModalWindodws/CreateBoardModal";
import CreateCardModal from "../ModalWindodws/CreateCardModal";
import {AddButtonProps} from "../../../types/interfaces";

const ButtonAdd: React.FC<AddButtonProps> = ({actionType, title, columnId, boardId}) => {
 const [isModalOpen, setIsModalOpen] = useState(false);

 const handleClose = () => setIsModalOpen(false);
 const handleOpen = () => setIsModalOpen(true);

 return (
  <>
   <button
    onClick={handleOpen}
    className="flex items-center h-14 w-auto gap-2 p-2 rounded-lg bg-transparent  hover:bg-primary-main/5 focus:bg-primary-main/5 transition-all duration-200 group"
   >
    <span className="text-primary-light dark:text-primary-dark group-hover:text-secondary-light group-hover:dark:text-secondary-dark">
     {title}
    </span>
   </button>

   {actionType === "board" ? (
    <CreateBoardModal
     isOpen={isModalOpen}
     onClose={handleClose}
    />
   ) : (
    <CreateCardModal
     open={isModalOpen}
     onClose={handleClose}
     columnId={columnId}
     boardId={boardId}
    />
   )}
  </>
 );
};

export default ButtonAdd;
