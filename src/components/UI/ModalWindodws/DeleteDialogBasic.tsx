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
   sx={{
    "& .MuiPaper-root": {
     borderRadius: "20px",
    },
   }}
  >
   <DialogTitle
    id="alert-dialog-title"
    className="text-center"
   >
    {title}
   </DialogTitle>
   <DialogContent>
    <div>{children}</div>
   </DialogContent>
   <DialogActions className="flex  flex-row  gap-12">
    <Button
     onClick={() => {
      onClick();
      onClose();
     }}
     autoFocus
    >
     Yes, I want to delete
    </Button>
    <Button onClick={onClose}>No, keep it</Button>
   </DialogActions>
  </Dialog>
 );
};
export default DeleteDialog;
