// import React from "react";
// import Backdrop from "@mui/material/Backdrop";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Fade from "@mui/material/Fade";
// import Typography from "@mui/material/Typography";
// import {BaseModalProps} from "../../../types/interfaces";

// const BaseModal: React.FC<BaseModalProps> = ({open, onClose, children, title, width = 400}) => {
//  return (
//   <Modal
//    open={open}
//    onClose={onClose}
//    closeAfterTransition
//    slots={{backdrop: Backdrop}}
//    slotProps={{
//     backdrop: {
//      timeout: 500,
//     },
//    }}
//   >
//    <Fade in={open}>
//     <Box
//      className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark
//                      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
//                      rounded-2xl shadow-lg p-4 w-[400px] max-w-full"
//     >
//      {title && (
//       <Typography
//        id="modal-title"
//        variant="h6"
//        component="h2"
//        textAlign="center"
//        className="text-text-light dark:text-text-dark text-center"
//       >
//        {title}
//       </Typography>
//      )}
//      <Box
//       mt={2}
//       className="text-text-light dark:text-text-dark"
//      >
//       {children}
//      </Box>
//     </Box>
//    </Fade>
//   </Modal>
//  );
// };

// export default BaseModal;
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
    className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark 
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
