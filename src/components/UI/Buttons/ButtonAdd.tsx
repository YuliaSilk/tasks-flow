import React, {useState} from "react";
import CreateBoardModal from "../ModalWindodws/CreateBoardModal";

const CreateBoardButton: React.FC = () => {
 const [isModalOpen, setIsModalOpen] = useState(false);

 return (
  <div>
   <button onClick={() => setIsModalOpen(true)}>Create New Board</button>
   <CreateBoardModal
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
   />
  </div>
 );
};

export default CreateBoardButton;
