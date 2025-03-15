import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import {BaseModalProps} from "../../../types/interfaces";

const BaseModal: React.FC<BaseModalProps> = ({open, onClose, children, title, width = 400}) => {
 return (
  <Modal
   open={open}
   onClose={onClose}
   closeAfterTransition
   slots={{backdrop: Backdrop}}
   slotProps={{
    backdrop: {
     timeout: 500,
    },
   }}
  >
   <Fade in={open}>
    <Box
     className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark 
                     absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                     rounded-2xl shadow-lg p-4 w-[400px] max-w-full"
    >
     {title && (
      <Typography
       id="modal-title"
       variant="h6"
       component="h2"
       textAlign="center"
       className="text-text-light dark:text-text-dark text-center"
      >
       {title}
      </Typography>
     )}
     <Box
      mt={2}
      className="text-text-light dark:text-text-dark"
     >
      {children}
     </Box>
    </Box>
   </Fade>
  </Modal>
 );
};

export default BaseModal;
