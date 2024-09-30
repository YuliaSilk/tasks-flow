import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Card from "./Card"; // Adjust the path as necessary
import {fetchCardById, deleteCard} from "../../redux/cards/operations"; // Your async operations
import {CardProps} from "../../types/types";

const CardContainer: React.FC<{cardId: string}> = ({cardId}) => {
 const dispatch = useDispatch();
 const card: CardProps | undefined = useSelector((state) => state.cards.cards.find((c) => c.id === cardId));

 // Fetch the card data when the component mounts
 useEffect(() => {
  dispatch(fetchCardById(cardId)); // Make sure this action fetches the single card
 }, [dispatch, cardId]);

 const handleEdit = (id: string) => {
  // Here you would typically open a modal or navigate to an edit page
  console.log(`Edit card with ID: ${id}`);
  // You can dispatch an action to open the modal if needed
 };

 const handleDelete = (id: string) => {
  dispatch(deleteCard(id));
 };

 if (!card) {
  return <div>Loading...</div>; // Handle loading state
 }

 return (
  <Card
   id={card.id}
   title={card.title}
   description={card.description}
   onEdit={handleEdit}
   onDelete={handleDelete}
  />
 );
};

export default CardContainer;
