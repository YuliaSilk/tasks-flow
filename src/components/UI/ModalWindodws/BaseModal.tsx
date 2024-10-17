import React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

interface BaseModalProps {
 open: boolean;
 onClose: () => void;
 children: React.ReactNode;
 title?: string;
 width?: number;
}

const BaseModal: React.FC<BaseModalProps> = ({open, onClose, children, title, width = 400}) => {
 const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: width,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
 };

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
    <Box sx={style}>
     {title && (
      <Typography
       id="modal-title"
       variant="h6"
       component="h2"
       textAlign="center"
      >
       {title}
      </Typography>
     )}
     <Box mt={2}>{children}</Box>
    </Box>
   </Fade>
  </Modal>
 );
};

export default BaseModal;
