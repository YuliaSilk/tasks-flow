import React, {useState, useCallback, memo} from "react";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../redux/store";
import {deleteCard, editCard, fetchCards} from "../../redux/cards/operations";
import {Draggable} from "@hello-pangea/dnd";
import {useSnackbar} from "notistack";
import {CardComponentProps} from "../../types/interfaces";
import {EditCardModal} from "../UI/ModalWindodws";
import DeleteDialogBasic from "../UI/ModalWindodws/DeleteDialogBasic";
import {Icon} from "../UI/Icons/Icons";

const Card: React.FC<CardComponentProps> = memo(({_id: cardId, title, description, index, boardId, columnId}) => {
 const dispatch: AppDispatch = useDispatch();
 const {enqueueSnackbar} = useSnackbar();
 console.log("Card render:", {cardId, title, description, index, boardId, columnId});

 const [isDialogOpen, setDialogOpen] = useState(false);
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);

 const boardIdStr = boardId ? String(boardId) : "";
 const columnIdStr = columnId ? String(columnId) : "";

 const handleDelete = useCallback(async () => {
  if (!boardIdStr || !columnIdStr) {
   console.error("Missing boardId or columnId for delete:", {boardIdStr, columnIdStr});
   return;
  }

  try {
   const result = await dispatch(deleteCard({boardId: boardIdStr, columnId: columnIdStr, _id: cardId})).unwrap();
   if (result) {
    enqueueSnackbar("Card deleted successfully!", {variant: "success"});
    setDialogOpen(false);
    await dispatch(fetchCards());
   }
  } catch (error) {
   console.error("Error deleting card:", error);
   enqueueSnackbar("Error deleting card!", {variant: "error"});
  }
 }, [boardIdStr, columnIdStr, cardId, dispatch, enqueueSnackbar]);

 const handleEdit = useCallback(
  async (cardId: string, newTitle: string, newDescription: string) => {
   if (!boardIdStr || !columnIdStr) {
    console.error("Missing boardId or columnId for edit:", {boardIdStr, columnIdStr});
    return;
   }

   try {
    const result = await dispatch(
     editCard({
      boardId: boardIdStr,
      columnId: columnIdStr,
      _id: cardId,
      title: newTitle,
      description: newDescription,
     })
    ).unwrap();
    if (result) {
     setIsEditModalOpen(false);
     enqueueSnackbar("Card updated successfully!", {variant: "success"});
     await dispatch(fetchCards());
    }
   } catch (error) {
    console.error("Error editing card:", error);
    enqueueSnackbar("Error editing card!", {variant: "error"});
   }
  },
  [boardIdStr, columnIdStr, dispatch, enqueueSnackbar]
 );

 // Check if we have valid IDs
 if (!boardIdStr || !columnIdStr || boardIdStr === "undefined" || columnIdStr === "undefined") {
  console.error("Card not rendering due to invalid IDs:", {boardId, columnId, boardIdStr, columnIdStr});
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
     className="w-[96%] min-w-0 h-auto my-6 mx-4 p-4 bg-background-light/60 dark:bg-primary-dark/20 rounded-lg flex flex-col gap-4 shadow-lg hover:shadow-xl dark:shadow-sm hover:border hover:border-primary-light/50 dark:hover:border-primary-dark/50 focus:border-[3px] focus:border-secondary-light/10 dark:focus:border-secondary-dark/10 transition-all duration-200"
     role="article"
     aria-label={`Card: ${title}`}
    >
     <h3 className="font-bold text-text dark:text-text-dark text-[24px] underline">{title}</h3>
     <div
      className="w-full min-h-[160px] p-3 overflow-hidden hover:cursor-pointer hover:bg-primary-main/5 focus:bg-primary-main/5 rounded-lg"
      role="region"
      aria-label="Card description"
     >
      <p className="text-text text-[16px] md:text-[18px] lg:text-[20px] font-bold mb-2">to do:</p>
      <p className="text-text text-[16px] md:text-[18px] lg:text-[20px]">{description}</p>
     </div>
     <div className="flex w-full justify-between gap-4 items-center">
      <button
       onClick={() => setIsEditModalOpen(true)}
       className="w-8 h-8 text-text-light dark:text-text-dark hover:text-secondary-light focus:text-secondary-dark bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-200"
       aria-label="Edit card"
      >
       <Icon
        name="edit"
        className="w-6 h-6"
       />
      </button>

      <button
       onClick={() => setDialogOpen(true)}
       className="w-8 h-8 text-text-light dark:text-text-dark hover:text-red-400 focus:text-red-600 bg-transparent hover:bg-transparent focus:bg-transparent transition-all translate-x-2 duration-300"
       aria-label="Delete card"
      >
       <Icon
        name="trash"
        className="w-6 h-6"
       />
      </button>
     </div>
     <DeleteDialogBasic
      isOpen={isDialogOpen}
      onClose={() => setDialogOpen(false)}
      title="Delete Card"
      content="Are you sure you want to delete this card?"
      onDelete={handleDelete}
     />

     <EditCardModal
      open={isEditModalOpen}
      onClose={() => setIsEditModalOpen(false)}
      cardId={cardId}
      title={title}
      description={description}
      onEdit={handleEdit}
      boardId={boardIdStr}
      columnId={columnIdStr}
     />
    </div>
   )}
  </Draggable>
 );
});

Card.displayName = "Card";

export default Card;
