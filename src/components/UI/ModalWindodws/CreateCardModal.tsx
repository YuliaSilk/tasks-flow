import React, {useEffect} from "react";
import BaseModal from "./BaseModal";
import {useForm, Controller} from "react-hook-form";
// import {Typography, TextField, Button} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {createCard} from "../../../redux/cards/operations";
import {useSnackbar} from "notistack";
import {CreateCardModalProps} from "../../../types/interfaces";
import {AppDispatch, RootState} from "../../../redux/store";

const CreateCardModal: React.FC<CreateCardModalProps> = ({open, onClose, columnId, boardId}) => {
 const dispatch = useDispatch<AppDispatch>();
 const {enqueueSnackbar} = useSnackbar();
 const {
  control,
  handleSubmit,
  formState: {errors},
  reset,
 } = useForm<{cardTitle: string; cardDescription: string}>();

 const cards = useSelector(
  (state: RootState) => state.boards.currentBoard?.columns.find((col) => col._id === columnId)?.card || []
 );

 useEffect(() => {
  reset({cardTitle: "", cardDescription: ""});
 }, [open, reset]);

 const onSubmit = async (data: {cardTitle: string; cardDescription: string}) => {
  try {
   const {cardTitle, cardDescription} = data;

   if (!cardTitle || !cardDescription) {
    enqueueSnackbar("Please enter both a card title and description.", {variant: "error"});
    return;
   }
   const isDuplicateTitle = cards.some((card: {title: string}) => card.title.toLowerCase() === cardTitle.toLowerCase());

   if (isDuplicateTitle) {
    enqueueSnackbar("A card with this title already exists!", {variant: "error"});
    return;
   }
   if (cardTitle.length > 50) {
    enqueueSnackbar("Card title must be less than 50 characters.", {variant: "error"});
    return;
   }
   if (cardDescription.length > 500) {
    enqueueSnackbar("Card description must be less than 500 characters.", {variant: "error"});
    return;
   }
   await dispatch(
    createCard({
     title: cardTitle,
     description: cardDescription,
     columnId,
     boardId,
    })
   ).unwrap();
   enqueueSnackbar("Card created successfully!", {variant: "success"});
   reset();
   onClose();
   if (!open) return null;
  } catch (error: unknown) {
   console.error("Error creating card:", error);
   enqueueSnackbar("Error creating card!", {variant: "error"});
  }
 };

 return (
  <BaseModal
   open={open}
   onClose={onClose}
  >
   <h2 className="text-xl font-semibold mb-4">Create New Card</h2>
   <form
    onSubmit={handleSubmit(onSubmit)}
    className="flex flex-col gap-4 mb-5"
   >
    <div>
     <label
      htmlFor="cardTitle"
      className="block text-sm text-gray-700 dark:text-gray-300 mb-2"
     >
      Card Title
     </label>
     <Controller
      name="cardTitle"
      control={control}
      rules={{
       required: "Card title is required",
       maxLength: {value: 50, message: "Title must be less than 50 characters"},
      }}
      render={({field}) => (
       <input
        {...field}
        id="cardTitle"
        type="text"
        className={`w-full border border-gray-300 rounded-md p-2 ${
         errors.cardTitle ? "border-red-500" : "focus:ring-2 focus:ring-blue-500"
        } dark:bg-gray-700 dark:text-white`}
       />
      )}
     />
     {errors.cardTitle && <p className="text-red-500 text-sm mt-1">{errors.cardTitle.message}</p>}
    </div>

    <div>
     <label
      htmlFor="cardDescription"
      className="block text-sm text-gray-700 dark:text-gray-300 mb-2"
     >
      Card Description
     </label>
     <Controller
      name="cardDescription"
      control={control}
      rules={{
       required: "Card description is required",
       maxLength: {value: 500, message: "Description must be less than 500 characters"},
      }}
      render={({field}) => (
       <textarea
        {...field}
        id="cardDescription"
        rows={4}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
       />
      )}
     />
     {errors.cardDescription && <p className="text-red-500 text-sm mt-1">{errors.cardDescription.message}</p>}
    </div>

    <div className="flex justify-between">
     <button
      type="submit"
      className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
     >
      Create
     </button>
     <button
      type="button"
      onClick={onClose}
      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-200 dark:text-white dark:border-gray-600 dark:hover:bg-gray-500"
     >
      Close
     </button>
    </div>
   </form>
   {/* <TextField
     label="Card Title"
     variant="standard"
     fullWidth
     value={cardTitle}
     onChange={(e) => setCardTitle(e.target.value)}
     error={!!titleError}
     helperText={titleError}
     InputProps={{
      className: "text-text-light dark:text-text-dark text-[14px] md:text-[16px] lg:text-[18px]",
     }}
     InputLabelProps={{
      className: "text-gray-700 dark:text-gray-300 text-[14px] md:text-[20px] lg:text-[24px]",
     }}
    />
    <TextField
     label="Card Description"
     variant="standard"
     fullWidth
     value={cardDescription}
     onChange={(e) => setCardDescription(e.target.value)}
     InputProps={{
      className: "text-black dark:text-white",
     }}
     InputLabelProps={{
      className: "text-gray-700 dark:text-gray-300",
     }}
    />
   </div>
   <div className="flex justify-between">
    <Button
     variant="contained"
     color="primary"
     onClick={handleCreateCard}
    >
     Create
    </Button>
    <Button
     variant="outlined"
     onClick={onClose}
    >
     Close
    </Button> */}
  </BaseModal>
 );
};

export default CreateCardModal;
