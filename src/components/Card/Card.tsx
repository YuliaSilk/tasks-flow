import React, {useState, useCallback, memo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {deleteCard, editCard} from "../../redux/cards/operations";
import DeleteDialog from "../../components/UI/ModalWindodws/DeleteDialogBasic";
import {getBoardById} from "../../redux/boards/operations";
import EditCardModal from "../../components/UI/ModalWindodws/EditCardModal";
import {Draggable} from "@hello-pangea/dnd";
import {useSnackbar} from "notistack";
import {CardComponentProps, BoardsState} from "../../types/interfaces";

const Card: React.FC<CardComponentProps> = memo(({_id: cardId, title, description, index}) => {
 const dispatch: AppDispatch = useDispatch();
 const {enqueueSnackbar} = useSnackbar();

 const [isDialogOpen, setDialogOpen] = useState(false);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);

 const columnId = useSelector((state: {boards: BoardsState}) => state.boards.currentBoard?.columns[0]._id);
 const boardId = useSelector((state: {boards: BoardsState}) => state.boards.currentBoard?._id);

 const boardIdStr = boardId ? String(boardId) : "";
 const columnIdStr = columnId ? String(columnId) : "";

 const openEditModal = useCallback(() => {
  setIsEditModalOpen(true);
 }, []);

 const handleDelete = useCallback(async () => {
  if (!boardIdStr || !columnIdStr) return;

  try {
   await dispatch(deleteCard({boardId: boardIdStr, columnId: columnIdStr, _id: cardId})).unwrap();
   enqueueSnackbar("Card deleted successfully!", {variant: "success"});
   dispatch(getBoardById(boardIdStr));
   setDialogOpen(false);
  } catch (error) {
   console.error("Error deleting card:", error);
   enqueueSnackbar("Error deleting card!", {variant: "error"});
  }
 }, [boardIdStr, columnIdStr, cardId, dispatch, enqueueSnackbar]);

 const handleEdit = useCallback(
  (cardId: string, newTitle: string, newDescription: string) => {
   if (!boardIdStr || !columnIdStr) return;

   dispatch(
    editCard({boardId: boardIdStr, columnId: columnIdStr, _id: cardId, title: newTitle, description: newDescription})
   )
    .then(() => {
     dispatch(getBoardById(boardIdStr));
    })
    .catch((error) => {
     console.error("Error editing card:", error);
     enqueueSnackbar("Error editing card!", {variant: "error"});
    });
  },
  [boardIdStr, columnIdStr, dispatch, enqueueSnackbar]
 );

 if (!boardId || !columnId) {
  return null;
 }

 return (
  <Draggable
   draggableId={cardId.toString()}
   key={cardId}
   index={index}
  >
   {(provided) => (
    <div
     {...provided.draggableProps}
     {...provided.dragHandleProps}
     ref={provided.innerRef}
     className="w-[96%] min-w-0 h-[220px] m-4 p-3 bg-background-light/60 dark:bg-primary-dark/20 rounded-lg flex flex-col gap-4 shadow-card-shadow dark:shadow-sm hover:shadow-card-hover hover:border-[1px] hover:border-primary-light/50 dark:hover:border-primary-dark/50 focus:border-[3px] focus:border-secondary-light/10 dark:focus:border-secondary-dark/10 transition-all duration-200"
     role="article"
     aria-label={`Card: ${title}`}
    >
     <h3 className="font-bold text-text dark:text-text-dark text-[24px] underline">{title}</h3>
     <div
      className="w-full h-[160px] p-1 overflow-hidden hover:cursor-pointer hover:bg-primary-main/5 focus:bg-primary-main/5 rounded-lg"
      role="region"
      aria-label="Card description"
     >
      <p className="text-text text-[16px] md:text-[18px] lg:text-[20px] font-bold"> to do:</p>
      <p className="text-text text-[16px md:text-[18px] lg:text-[20px]">{description} </p>
     </div>
     <div className="flex w-full justify-end gap-4 items-center">
      <button
       onClick={openEditModal}
       className="w-8 h-8 text-text-light dark:text-text-dark bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
       aria-label="Edit card"
      >
       <svg
        className="hover:text-secondary-light focus:text-secondary-dark"
        width="24px"
        height="24px"
        fill="#B3ABF9"
        aria-hidden="true"
       >
        <use href="/images/sprite.svg#icon-edit" />
       </svg>
      </button>

      <button
       onClick={() => setDialogOpen(true)}
       className="w-8 h-8 text-text-light dark:text-text-dark hover:text-red-400 focus:text-red-600 bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-300"
       aria-label="Delete card"
      >
       <svg
        width="24px"
        height="24px"
        fill="#B3ABF9"
        className="hover:text-red-400 focus:text-red-600"
        aria-hidden="true"
       >
        <use href="/images/sprite.svg#icon-bin" />
       </svg>
      </button>
     </div>
     <DeleteDialog
      isOpen={isDialogOpen}
      onClose={() => setDialogOpen(false)}
      title="Delete Card"
      content="Are you sure you want to delete this card?"
      onDelete={handleDelete}
     />

     {isEditModalOpen && (
      <EditCardModal
       open={isEditModalOpen}
       onClose={() => setIsEditModalOpen(false)}
       cardId={cardId}
       title={title}
       description={description}
       onEdit={handleEdit}
       boardId={boardIdStr}
      />
     )}
    </div>
   )}
  </Draggable>
 );
});

Card.displayName = "Card";

export default Card;
