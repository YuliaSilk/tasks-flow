import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {createBoard} from "../../../redux/boards/operations";
const CreateBoardModal: React.FC<{isOpen: boolean; onClose: () => void}> = ({isOpen, onClose}) => {
 const [boardTitle, setBoardTitle] = useState("");
 const dispatch = useDispatch();

 const handleCreateBoard = () => {
  dispatch<any>(
   createBoard()
   // {
   // title: boardTitle,
   // columns: [],
   //    }
  );

  onClose();
 };

 if (!isOpen) return null;

 return (
  <div className="modal">
   <div className="modal-content">
    <h2>Create New Board</h2>
    <input
     type="text"
     placeholder="Board title"
     value={boardTitle}
     onChange={(e) => setBoardTitle(e.target.value)}
    />
    <button onClick={handleCreateBoard}>Create</button>
    <button onClick={onClose}>Close</button>
   </div>
  </div>
 );
};

export default CreateBoardModal;
