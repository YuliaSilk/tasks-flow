import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import {styled} from "@mui/material/styles";
import Button from "@mui/material/Button";
import {ButtonProps} from "../../../types/types";

const StyledButtonAdd = styled(Button)(({theme}) => ({
 "&.MuiButton-root": {
  backgroundColor: "transparent",
  color: theme.palette.primary.main,
  borderRadius: "20px",
  width: "auto",
  height: "50px",
  "&:hover": {
   backgroundColor: "transparent",
  },
 },
 "& .MuiSvgIcon-root": {
  fontSize: "2rem",
 },
}));

const ButtonAddCard: React.FC<ButtonProps> = ({onClick}) => {
 return (
  <StyledButtonAdd
   variant="contained"
   onClick={onClick}
  >
   <AddRoundedIcon />
   <span>Create a new card</span>
  </StyledButtonAdd>
 );
};

export default ButtonAddCard;
