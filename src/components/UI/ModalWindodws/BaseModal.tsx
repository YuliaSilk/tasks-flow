import React, {useEffect} from "react";
import {BaseModalProps} from "../../../types/interfaces";

const BaseModal: React.FC<BaseModalProps> = ({open, onClose, children, title, width = 400}) => {
 useEffect(() => {
  if (open) {
   document.body.classList.add("overflow-hidden");
  } else {
   document.body.classList.remove("overflow-hidden");
  }
  return () => document.body.classList.remove("overflow-hidden");
 }, [open]);

 if (!open) return null;

 return (
  <div
   className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
   onClick={onClose}
  >
   <div
    className="bg-background-light dark:bg-gray-800 text-gray-900 dark:text-text-dark 
                   rounded-2xl shadow-lg p-6 w-full max-w-[400px] transform transition-all scale-95"
    style={{width}}
    onClick={(e) => e.stopPropagation()}
   >
    {title && <h2 className="text-lg font-semibold text-center mb-4">{title}</h2>}
    <div>{children}</div>
   </div>
  </div>
 );
};

export default BaseModal;
