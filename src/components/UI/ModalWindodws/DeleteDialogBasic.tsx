import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {DeleteDialogProps} from "../../../types/interfaces";
const DeleteDialog: React.FC<DeleteDialogProps> = ({isOpen, onClose, children, title, onClick}) => {
 return (
  <Dialog
   open={isOpen}
   onClose={onClose}
   aria-labelledby="alert-dialog-title"
   aria-describedby="alert-dialog-description"
   className="text-text-light dark:text-text-dark"
   sx={{
    "& .MuiPaper-root": {
     borderRadius: "20px",
     backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#1A202C" : "#F9FAFB"),
     color: (theme) => (theme.palette.mode === "dark" ? "#d7d9ff" : "#000229"),
    },
   }}
  >
   <DialogTitle
    id="alert-dialog-title"
    sx={{
     textAlign: "center",
     color: (theme) => (theme.palette.mode === "dark" ? "#d7d9ff" : "#000229"),
    }}
   >
    {title}
   </DialogTitle>
   <DialogContent
    sx={{
     backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#050e1a" : "#FDFFFC"),
     color: (theme) => (theme.palette.mode === "dark" ? "#d7d9ff" : "#000229"),
    }}
   >
    <div>{children}</div>
   </DialogContent>
   <DialogActions
    sx={{
     backgroundColor: (theme) => (theme.palette.mode === "dark" ? "#050e1a" : "#FDFFFC"),
     color: (theme) => (theme.palette.mode === "dark" ? "#d7d9ff" : "#000229"),
    }}
    className="flex flex-row gap-12 bg-background-light dark:bg-background-dark"
   >
    <Button
     onClick={() => {
      onClick();
      onClose();
     }}
     autoFocus
     className="text-text-light dark:text-text-dark"
    >
     Yes, I want to delete
    </Button>
    <Button onClick={onClose}>No, keep it</Button>
   </DialogActions>
  </Dialog>
 );
};
export default DeleteDialog;
