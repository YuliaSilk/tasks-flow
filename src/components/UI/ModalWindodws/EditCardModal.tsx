import React, {useState} from "react";
import BaseModal from "./BaseModal";
// import {TextField} from "@mui/material";
// import {Button} from "@mui/material";

const EditCardModal: React.FC<{
 cardId: string;
 title: string;
 description: string;
 boardId: string;
 onEdit: (cardId: string, title: string, description: string) => void;
 onClose: () => void;
 open: boolean;
}> = ({cardId, title, description, onEdit, onClose}) => {
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
    <input
     type="text"
     //  label="Title"
     //  fullWidth
     //  variant="standard"
     //  margin="normal"
     value={editedTitle}
     onChange={(e) => setEditedTitle(e.target.value)}
     //  InputProps={{
     //   className: "text-black dark:text-white",
     //  }}
     //  InputLabelProps={{
     //   className: "text-gray-700 dark:text-gray-300",
     //  }}
    />
    <input
     //  label="Description"
     //  fullWidth
     //  variant="standard"
     //  margin="normal"
     //  multiline
     value={editedDescription}
     onChange={(e) => setEditedDescription(e.target.value)}
     //  InputProps={{
     //   className: "text-black dark:text-white",
     //  }}
     //  InputLabelProps={{
     //   className: "text-gray-700 dark:text-gray-300",
     //  }}
    />
    <div className="flex justify-between">
     <button
      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-500"
      onClick={handleSave}
     >
      Save
     </button>
     <button
      type="button"
      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-500"
      onClick={onClose}
     >
      Cancel
     </button>
    </div>
   </BaseModal>
  </div>
 );
};

export default EditCardModal;
