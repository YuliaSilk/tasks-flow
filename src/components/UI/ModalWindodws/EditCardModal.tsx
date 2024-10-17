import React, {useState} from "react";
import BaseModal from "./BaseModal";
import {TextField} from "@mui/material";
import {Button} from "@mui/material";

const EditCardModal: React.FC<{
 cardId: string;
 title: string;
 description: string;
 boardId: string;
 onEdit: (cardId: string, title: string, description: string) => void;
 onClose: () => void;
 open: boolean;
}> = ({cardId, title, description, boardId, onEdit, onClose}) => {
 const [editedTitle, setEditedTitle] = useState(title);
 const [editedDescription, setEditedDescription] = useState(description);

 const handleSave = () => {
  onEdit(cardId, editedTitle, editedDescription);
  onClose();
 };

 return (
  <div>
   <BaseModal
    open={true}
    onClose={onClose}
    title={"Edit Card"}
   >
    <TextField
     label="Title"
     fullWidth
     variant="standard"
     margin="normal"
     value={editedTitle}
     onChange={(e) => setEditedTitle(e.target.value)}
    />
    <TextField
     label="Description"
     fullWidth
     variant="standard"
     margin="normal"
     multiline
     value={editedDescription}
     onChange={(e) => setEditedDescription(e.target.value)}
    />
    <div className="flex justify-between">
     <Button
      onClick={handleSave}
      variant="contained"
      color="primary"
      sx={{mt: 2}}
     >
      Save
     </Button>
     <Button
      onClick={onClose}
      variant="contained"
      color="primary"
      sx={{mt: 2}}
     >
      Cancel
     </Button>
    </div>
   </BaseModal>
  </div>
 );
};

export default EditCardModal;
