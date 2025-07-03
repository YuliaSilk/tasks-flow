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
}> = ({cardId, title, description, onEdit, onClose, open}) => {
 const [editedTitle, setEditedTitle] = useState(title);
 const [editedDescription, setEditedDescription] = useState(description);

 const handleSave = () => {
  onEdit(cardId, editedTitle, editedDescription);
  onClose();
 };

 return (
  <div>
   <BaseModal
    open={open}
    onClose={onClose}
    title="Edit Card"
   >
    <div className="flex flex-col gap-4">
     <div>
      <label
       htmlFor="title"
       className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
       Title
      </label>
      <input
       id="title"
       type="text"
       value={editedTitle}
       onChange={(e) => setEditedTitle(e.target.value)}
       className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
      />
     </div>
     <div>
      <label
       htmlFor="description"
       className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
      >
       Description
      </label>
      <textarea
       id="description"
       value={editedDescription}
       onChange={(e) => setEditedDescription(e.target.value)}
       className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
       rows={4}
      />
     </div>
     <div className="flex justify-between mt-4">
      <button
       className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
    </div>
   </BaseModal>
  </div>
 );
};

export default EditCardModal;
