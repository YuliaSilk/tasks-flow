import React, {useEffect} from "react";
import {Dialog, DialogTitle, DialogContent, DialogActions, Button} from "@mui/material";
import useMuiTheme from "../../../hooks/useTheme";
import {ThemeProvider, useThemeContext} from "../../../hooks/useThemeContext";
import {DeleteDialogProps} from "../../../types/interfaces";
const DeleteDialog: React.FC<DeleteDialogProps> = ({isOpen, onClose, onDelete, title, content}) => {
 const theme = useThemeContext();
 const muiTheme = useMuiTheme();

 useEffect(() => {
  const updateTheme = () => {};
  updateTheme();
 }, [muiTheme]);

 return (
  <ThemeProvider>
   <Dialog
    open={isOpen}
    onClose={onClose}
    sx={{
     "& .MuiPaper-root": {
      backgroundColor: muiTheme.palette.background.default,
      color: muiTheme.palette.text.primary,
      border: theme.theme === "dark" ? "1px solid #444" : "1px solid #ccc",
      borderRadius: "20px",
      boxShadow:
       muiTheme.palette.mode === "dark" ? "0px 4px 12px rgba(255, 255, 255, 0.08)" : "0px 4px 12px rgba(0, 0, 0, 0.15)",
      transition: "all 0.3s ease-in-out",
     },
    }}
   >
    <DialogTitle
     sx={{
      textAlign: "center",
      textTransform: "capitalize",
      fontSize: "1.5rem",
      color: muiTheme.palette.text.primary,
     }}
    >
     {title}
    </DialogTitle>
    <DialogContent sx={{color: muiTheme.palette.text.primary}}>{content}</DialogContent>
    <DialogActions sx={{justifyContent: "space-between"}}>
     <Button
      onClick={onClose}
      sx={{
       borderRadius: "20px",
       color: muiTheme.palette.text.primary,
       "&:hover": {
        backgroundColor: (muiTheme) =>
         muiTheme.palette.mode === "dark" ? "rgba(54, 9, 169, 0.414)" : "rgba(74, 47, 211, 0.49)",
       },
       transition: "all 0.3s ease-in-out",
      }}
     >
      No, keep it
     </Button>
     <Button
      onClick={() => {
       onDelete();
       onClose();
      }}
      color="error"
      autoFocus
      sx={{
       borderRadius: "20px",
       color: muiTheme.palette.error.main,
       "&:hover": {
        backgroundColor: (muiTheme) =>
         muiTheme.palette.mode === "dark" ? "rgba(255, 105, 97, 0.2)" : "rgba(211, 47, 47, 0.2)",
       },
       transition: "all 0.3s ease-in-out",
      }}
     >
      Yes, I want to delete
     </Button>
    </DialogActions>
   </Dialog>
  </ThemeProvider>
 );
};

export default DeleteDialog;
