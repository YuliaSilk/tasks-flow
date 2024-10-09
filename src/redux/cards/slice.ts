import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCards, createCard, getCardById, editCard, deleteCard } from './operations';
import { CardProps, ColumnProps } from '../../types/types';
import {  dndMovement, updateStatusLocalThunk } from '../cards/operations';

interface CardsState {
  cards: CardProps[];
  isLoading: boolean;
  error: string | null;
  filter: string;
  columns: ColumnProps[];
  
}

interface UpdateColumnCardsPayload {
  columnId: string;
  newCards: CardProps[];
}

const initialState: CardsState = {
  cards: [{
    _id: '',
    title: '',
    description: '',
    boardId: '',
    columnId: '',
  }],
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
      .addCase(fetchCards.fulfilled, (state, action: PayloadAction<CardProps[]>) => {
        state.isLoading = false;
        state.error = null;
        state.cards = action.payload;
      })

      .addCase(createCard.pending, handlePending)
      .addCase(createCard.rejected, handleRejected)
      // .addCase(createCard.fulfilled, (state, action: PayloadAction<CardProps>) => {
      //   console.log('Card successfully created: ', action.payload);
      //   state.cards.push(action.payload);
        // getColumnsById(action.payload.boardId);
      .addCase(createCard.fulfilled, (state, action) => {
          const { card, columnId } = action.payload;
              if (state[columnId]) {
            state[columnId].push(card);
          } else {
            state[columnId] = [card]; 
          }
      })

  
      .addCase(getCardById.pending, handlePending)
      .addCase(getCardById.rejected, handleRejected)
      .addCase(getCardById.fulfilled, (state, action: PayloadAction<CardProps>) => {
        state.isLoading = false;
        state.error = null;
        state.cards = [action.payload];
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
          console.error(`One of the columns does not exist: ${startColumnID}, ${finishColumnID}`);
          return;
        }
      
        if (!startColumn.cards) {
          console.error(`Start column does not have cards defined.`);
          return;
        }
      
        // Remove the card from the start column
        const cardIndex = startColumn.cards.findIndex((c) => c._id === card._id);
        if (cardIndex !== -1) {
          startColumn.cards.splice(cardIndex, 1);
        }
      
        // Add the card to the finish column
        if (!finishColumn.cards) {
          finishColumn.cards = [];
        }
        finishColumn.cards.splice(finishTaskIndex, 0, card);
      })
      // .addCase(dndMovement.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.error = null;
      //   const { card, finishTaskIndex, startColumnID, finishColumnID } = action.payload;
    
      //   const startColumn = state.columns.find(column => column._id === startColumnID);
      //   const finishColumn = state.columns.find(column => column._id === finishColumnID);
    
      //   // Ensure that startColumn and finishColumn exist and have `cards`
      //   if (!startColumn || !finishColumn) {
      //       console.error(`One of the columns does not exist: ${startColumnID}, ${finishColumnID}`);
      //       return;
      //   }
    
      //   if (!startColumn.cards) {
      //       console.error(`Start column does not have cards defined.`);
      //       return;
      //   }
    
      //   // Remove the card from the start column
      //   startColumn.cards = startColumn.cards.filter(c => c._id !== card._id);
    
      //   // Ensure finishColumn has a cards array initialized
      //   if (!finishColumn.cards) {
      //       finishColumn.cards = [];
      //   }
    
      //   // Add the card to the finish column
      //   finishColumn.cards.splice(finishTaskIndex, 0, card);
      // })
      
      .addCase(updateStatusLocalThunk.pending, handlePending)
      .addCase(updateStatusLocalThunk.rejected, handleRejected)
      .addCase(updateStatusLocalThunk.fulfilled, (state, action) => {
          const { card, currentColumnId, newColumnId, newCardIdx } = action.payload;
          const columns = state.columns;
                const currentColumnIdx = columns.findIndex(column => column._id === currentColumnId);
          columns[currentColumnIdx].cards = columns[currentColumnIdx].cards.filter(
              ({ _id }) => _id !== card._id
          );
                const newColumnIdx = columns.findIndex(column => column._id === newColumnId);
          if (!columns[newColumnIdx].cards) {
              columns[newColumnIdx].cards = [];
          }
          columns[newColumnIdx].cards.splice(newCardIdx, 0, card);
      });
    
  },
});

export const { setFilter } = cardSlice.actions;

export const cardsReducer = cardSlice.reducer;
// .addCase(dndMovement.fulfilled, (state, action) => {
      //     state.isLoading = false;
      //     state.error = null;
      //     const { card, finishTaskIndex, startColumnID, finishColumnID } = action.payload;
      
      //     const startColumnIndex = state.columns.findIndex(column => column._id === startColumnID);
      //     const finishColumnIndex = state.columns.findIndex(column => column._id === finishColumnID);
      
      //     // Видалення картки зі стартової колонки
      //     state.columns[startColumnIndex].cards = state.columns[startColumnIndex].cards.filter(
      //         (c) => c._id !== card._id
      //     );
      
      //     // Додавання картки у фінальну колонку
      //     if (!state.columns[finishColumnIndex].cards) {
      //         state.columns[finishColumnIndex].cards = [];
      //     }
      
      //     state.columns[finishColumnIndex].cards.splice(finishTaskIndex, 0, card);
      // })