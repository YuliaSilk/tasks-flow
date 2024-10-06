import React, {useState} from "react";
import BaseModal from "./BaseModal";
import {TextField, Typography} from "@mui/material";
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
    <Typography
     variant="h6"
     component="h2"
    >
     Edit Card
    </Typography>
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
    <Button
     onClick={handleSave}
     variant="contained"
     color="primary"
     sx={{mt: 2}}
    >
     Save
    </Button>
   </BaseModal>
  </div>
 );
};

export default EditCardModal;
