import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createBoard, fetchBoards, getBoardById} from "../../../redux/boards/operations";
import BaseModal from "./BaseModal";
// import {Button} from "@mui/material";
import {useSnackbar} from "notistack";
import {AppDispatch} from "../../../redux/store";
import {BoardsState, BoardProps} from "../../../types/interfaces";

const CreateBoardModal: React.FC<{isOpen: boolean; onClose: () => void}> = ({isOpen, onClose}) => {
 const dispatch = useDispatch<AppDispatch>();
 const {enqueueSnackbar} = useSnackbar();

 const [error, setError] = useState("");
 const [boardTitle, setBoardTitle] = useState("");
 const [isCreating, setIsCreating] = useState(false);

 const boards = useSelector((state: {boards: BoardsState}) => state.boards.boards);

 const handleCreateBoard = async () => {
  try {
   if (!boardTitle.trim()) {
    setError("Board title is required");
    return;
   }

   const trimmedTitle = boardTitle.trim();
   const isDuplicate = boards.some((board: BoardProps) => board.title.toLowerCase() === trimmedTitle.toLowerCase());
   if (isDuplicate) {
    setError("A board with this title already exists. Please choose another title.");
    return;
   }

   setIsCreating(true);

   // Fetch latest boards first to ensure we have the most up-to-date list
   await dispatch(fetchBoards());

   // Check again after fetching the latest boards
   const latestBoards = (await dispatch(fetchBoards())).payload as BoardProps[];
   const isStillDuplicate = latestBoards.some(
    (board: BoardProps) => board.title.toLowerCase() === trimmedTitle.toLowerCase()
   );

   if (isStillDuplicate) {
    setError("A board with this title already exists. Please choose another title.");
    setIsCreating(false);
    return;
   }

   const result = await dispatch(
    createBoard({
     title: trimmedTitle,
     columns: [],
    })
   ).unwrap();

   // Оновлюємо список дошок і вибираємо нову дошку
   await dispatch(fetchBoards());
   if (result?._id) {
    await dispatch(getBoardById(result._id));
   }

   setBoardTitle("");
   setError("");
   enqueueSnackbar("Board created successfully!", {variant: "success"});
   onClose();
  } catch (error) {
   console.error("Error creating board:", error);
   enqueueSnackbar("Error creating board!", {variant: "error"});
  } finally {
   setIsCreating(false);
  }
 };

 if (!isOpen) return null;

 return (
  <div className="modal">
   <div className="modal-content">
    <BaseModal
     open={isOpen}
     onClose={onClose}
    >
     <h2 className="text-xl font-semibold text-center mb-4">Create New Board</h2>
     <div className="flex flex-col gap-4 mb-5">
      <div>
       <label
        htmlFor="boardTitle"
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
       >
        Board Title
       </label>
       <input
        id="boardTitle"
        type="text"
        value={boardTitle}
        onChange={(e) => {
         setBoardTitle(e.target.value);
         setError("");
        }}
        disabled={isCreating}
        placeholder="Enter your new board title"
        className={`w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${
         error ? "border-red-500" : "border-gray-300"
        }`}
       />
       {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
     </div>
     <div className="flex justify-between">
      <button
       onClick={handleCreateBoard}
       disabled={isCreating}
       className={`px-6 py-2 bg-blue-500 text-white rounded-md transition-colors ${
        isCreating ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
       }`}
      >
       {isCreating ? "Creating..." : "Create"}
      </button>
      <button
       onClick={onClose}
       disabled={isCreating}
       className={`px-6 py-2 border border-gray-300 text-gray-700 rounded-md transition-colors dark:text-white dark:border-gray-600 ${
        isCreating ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-500"
       }`}
      >
       Close
      </button>
     </div>
    </BaseModal>
   </div>
  </div>
 );
};

export default CreateBoardModal;
