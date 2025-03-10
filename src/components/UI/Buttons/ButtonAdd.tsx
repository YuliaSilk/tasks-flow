import React, {useState} from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import CreateBoardModal from "../ModalWindodws/CreateBoardModal";
import CreateCardModal from "../ModalWindodws/CreateCardModal";
import {AddButtonProps} from "../../../types/interfaces";

const StyledButtonAdd = styled(Button)(({theme}) => ({
 "&.MuiButton-root": {
  backgroundColor: "transparent",
  color: theme.palette.primary.main,
  borderRadius: "20px",
  width: "auto",
  height: "50px",
  cursor: "pointer",
  transition: "color 0.3s ease-in-out",
  "&:hover": {
   backgroundColor: "transparent",
   color: theme.palette.secondary.main,
  },
 },
 "& .MuiSvgIcon-root": {
  fontSize: "2rem",
  transition: "color 0.3s ease-in-out",
 },
 "&:hover .MuiSvgIcon-root": {
  color: theme.palette.secondary.main,
 },
 "& span": {
  transition: "color 0.3s ease-in-out",
 },

 "&:hover span": {
  color: theme.palette.secondary.main,
 },
}));

const ButtonAdd: React.FC<AddButtonProps> = ({actionType, title, columnId, boardId}) => {
 const [isModalOpen, setIsModalOpen] = useState(false);

 const handleClose = () => setIsModalOpen(false);
 const handleOpen = () => setIsModalOpen(true);

 return (
  <>
   <StyledButtonAdd onClick={handleOpen}>
    <AddRoundedIcon className="text-primary-light dark:text-primary-dark" />
    <span className="text-primary-light dark:text-primary-dark">{title}</span>
   </StyledButtonAdd>

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
