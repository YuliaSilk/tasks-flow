import React from "react";
import {DeleteDialogProps} from "../../../types/interfaces";

const DeleteDialog: React.FC<DeleteDialogProps> = ({isOpen, onClose, onDelete, title, content}) => {
 if (!isOpen) return null;

 return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
   <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-2xl shadow-lg w-96 p-6 transition-transform transform scale-95 animate-fade-in">
    <h2 className="text-xl font-semibold text-center mb-4">{title}</h2>
    <p className="text-center mb-6">{content}</p>
    <div className="flex justify-between">
     <button
      onClick={onClose}
      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
     >
      No, keep it
     </button>
     <button
      onClick={() => {
       onDelete();
       onClose();
      }}
      className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
     >
      Yes, I want to delete
     </button>
    </div>
   </div>
  </div>
 );
};

export default DeleteDialog;
