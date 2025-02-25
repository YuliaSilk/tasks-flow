import React from "react";
// import {Button} from "@mui/material";
// import {styled} from "@mui/material/styles";

// const StyledButtonLoad = styled(Button)(({theme}) => ({
//  "&.MuiButton-root": {
//   backgroundColor: "transparent",
//   color: theme.palette.primary.main,
//   borderRadius: "20px",
//   width: "120px",
//   height: "50px",
//   "&:hover": {
//    backgroundColor: "transparent",
//   },
//  },
//  "& .MuiSvgIcon-root": {
//   fontSize: "2rem",
//  },
// }));
interface ButtonLoadProps {
 onClick: () => void;
}
const ButtonLoad: React.FC<ButtonLoadProps> = ({onClick}) => {
 return (
  <button
   className="bg-primary-light dark:bg-primary-dark rounded-2xl w-20 h-10 md:h-14 text-700 text-text-dark dark:text-text-light text-lg text-bold border border-2px border-primary-light dark:border-primary-dark hover:bg-transparent hover:text-primary-light dark:hover:bg-transparent dark:hover:text-primary-dark transition duration-300"
   //    variant="contained"
   onClick={onClick}
  >
   Load
  </button>
 );
};
export default ButtonLoad;

// {
//  /* <button
// className="bg-transparent text-blue-500 rounded-2xl w-30 h-12 border border-blue-500 hover:bg-transparent transition"
// onClick={onClick}
// >
// Load
// </button> */
// }
