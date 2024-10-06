import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface DeleteDialogProps {
 isOpen: boolean;
 onClose: () => void;
 children: React.ReactNode;
 title?: string;
 width?: number;
 onClick: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({isOpen, onClose, children, title, onClick}) => {
 return (
  <Dialog
   open={isOpen}
   onClose={onClose}
   aria-labelledby="alert-dialog-title"
   aria-describedby="alert-dialog-description"
  >
   <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
   <DialogContent>
    <DialogContentText id="alert-dialog-description">{children}</DialogContentText>
   </DialogContent>
   <DialogActions>
    <Button onClick={onClose}>No, keep it</Button>
    <Button
     onClick={() => {
      onClick();
      onClose();
     }}
     autoFocus
    >
     Yes, I want to delete
    </Button>
   </DialogActions>
  </Dialog>
 );
};
export default DeleteDialog;
