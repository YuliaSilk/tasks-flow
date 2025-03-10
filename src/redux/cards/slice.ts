import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCards, createCard, getCardById, editCard, deleteCard } from './operations';
import { CardProps, CardsState, UpdateColumnCardsPayload } from '../../types/interfaces';
import {  dndMovement, updateStatusLocalThunk } from '../cards/operations';

const initialState: CardsState = {
  cards: [],
  columns:[],
  isLoading: false,
  error: null,
  filter: '',
  
};
const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    
    updateColumnCards: (state, action: PayloadAction<UpdateColumnCardsPayload>) => {
      const { columnId, newCards } = action.payload;
      state.columns = state.columns.map((column) =>
        column._id === columnId
          ? { ...column, cards: newCards }
          : column
      );
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCards.rejected, handleRejected)
      .addCase(fetchCards.fulfilled, (state, action)=> {
        state.isLoading = false;
        state.error = null;
        state.cards = action.payload.cards || [];
        state.columns = action.payload.columns || [];
      })

      .addCase(createCard.pending, handlePending)
      .addCase(createCard.rejected, handleRejected)
      .addCase(createCard.fulfilled, (state, action: PayloadAction<{ card: CardProps; columnId: string }>) => {
        const { card } = action.payload;
        state.cards.push(card);
      })

      .addCase(getCardById.pending, handlePending)
      .addCase(getCardById.rejected, handleRejected)
      .addCase(getCardById.fulfilled, (state, action: PayloadAction<CardProps>) => {
        state.isLoading = false;
        state.error = null;
        const index = state.cards.findIndex((c) => c._id === action.payload._id);
        if (index !== -1) {
          state.cards[index] = action.payload;
        } else {
          state.cards.push(action.payload);
        }
      })
     
      .addCase(editCard.pending, handlePending)
      .addCase(editCard.rejected, handleRejected)
      .addCase(editCard.fulfilled, (state, action: PayloadAction<CardProps>) => {
        const index = state.cards.findIndex(card => card._id === action.payload._id);
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
      })

      .addCase(deleteCard.pending, handlePending)
      .addCase(deleteCard.rejected, handleRejected)
      .addCase(deleteCard.fulfilled, (state, action: PayloadAction<CardProps>) => {
        const id = typeof action.payload === 'string' ? action.payload : action.payload._id;
        state.cards = state.cards.filter(card => card._id !== id);
      })
   
      .addCase(dndMovement.pending, handlePending)
      .addCase(dndMovement.rejected, handleRejected)
      .addCase(dndMovement.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const { card, finishTaskIndex, startColumnID, finishColumnID } = action.payload;
    
        const startColumn = state.columns.find((column) => column._id === startColumnID);
        const finishColumn = state.columns.find((column) => column._id === finishColumnID);
        
        if (!startColumn || !finishColumn) {
          return;
        }
        
        const cardIndex = startColumn.cards.findIndex((c) => c._id === card._id);
        if (cardIndex !== -1) {
          startColumn.cards.splice(cardIndex, 1);
        }
      
        if (!finishColumn.cards) {
          finishColumn.cards = [];
        }
        finishColumn.cards.splice(finishTaskIndex, 0, card);
        
        state.columns = [...state.columns];
      })
      
      .addCase(updateStatusLocalThunk.pending, handlePending)
      .addCase(updateStatusLocalThunk.rejected, handleRejected)
      .addCase(updateStatusLocalThunk.fulfilled, (state, action) => {
          const { card, currentColumnId, newColumnId, newCardIdx } = action.payload;
          const columns = state.columns;
          const currentColumnIdx = columns.findIndex(column => column._id === currentColumnId);
          if (currentColumnIdx !== -1) {
            columns[currentColumnIdx].cards = columns[currentColumnIdx].cards.filter(
              ({ _id }) => _id !== card._id);
          }
          
          const newColumnIdx = columns.findIndex(column => column._id === newColumnId);
          if (newColumnIdx !== -1) {
            if (!columns[newColumnIdx].cards) {
              columns[newColumnIdx].cards = [];
          }
          columns[newColumnIdx].cards.splice(newCardIdx, 0, card);
          }
          state.columns = [...columns];
          console.log("Redux cards state after DnD:", state.cards);
      })

      .addCase(updateColumnCards, (state, action: PayloadAction<{ columnId: string; newCards: CardProps[] }>) => {
        const { columnId, newCards } = action.payload;
        const columnIndex = state.columns.findIndex((column) => column._id === columnId);
        if (columnIndex !== -1) {
          state.columns[columnIndex].cards = newCards;
        }
      });
      
  },
});

export const { setFilter } = cardSlice.actions;

export const { updateColumnCards } = cardSlice.actions; 

export const cardsReducer = cardSlice.reducer;
