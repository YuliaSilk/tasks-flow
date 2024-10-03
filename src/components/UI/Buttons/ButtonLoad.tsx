import React from "react";
import {Button} from "@mui/material";
import {styled} from "@mui/material/styles";

const StyledButtonLoad = styled(Button)(({theme}) => ({
 "&.MuiButton-root": {
  backgroundColor: "transparent",
  color: theme.palette.primary.main,
  borderRadius: "20px",
  width: "120px",
  height: "50px",
  "&:hover": {
   backgroundColor: "transparent",
  },
 },
 "& .MuiSvgIcon-root": {
  fontSize: "2rem",
 },
}));
interface ButtonLoadProps {
 onClick: () => void;
}
const ButtonLoad: React.FC<ButtonLoadProps> = ({onClick}) => {
 return (
  <StyledButtonLoad
   variant="contained"
   onClick={onClick}
  >
   Load
  </StyledButtonLoad>
 );
};
export default ButtonLoad;
