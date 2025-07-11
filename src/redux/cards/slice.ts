import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsStateWithStatus } from '../types';
import {
  fetchCards,
  createCard,
  getCardById,
  deleteCard,
  editCard,
  dndMovement,
} from './operations';
import { CardProps, ColumnProps } from '../../types/interfaces';
import { handlePending, handleRejected, handleFulfilled } from '../utils';

interface FetchCardsResponse {
  cards: CardProps[];
  columns: ColumnProps[];
}

const initialState: CardsStateWithStatus = {
  cards: [],
  columns: [],
  isLoading: false,
  error: null,
  filter: '',
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCards(state, action: PayloadAction<CardProps[]>) {
      state.cards = action.payload;
    },
    setFilter(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    updateColumnCards(state, action: PayloadAction<{ columnId: string; newCards: CardProps[] }>) {
      const { columnId, newCards } = action.payload;
      const columnIndex = state.columns.findIndex(col => col._id === columnId);
      if (columnIndex !== -1) {
        state.columns[columnIndex].card = newCards;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch cards
      .addCase(fetchCards.pending, (state) => handlePending(state))
      .addCase(fetchCards.rejected, (state, action) => handleRejected(state, action))
      .addCase(fetchCards.fulfilled, (state, action: PayloadAction<FetchCardsResponse>) => {
        handleFulfilled(state);
        state.cards = action.payload.cards;
        state.columns = action.payload.columns;
      })

      // Get card by ID
      .addCase(getCardById.pending, (state) => handlePending(state))
      .addCase(getCardById.rejected, (state, action) => handleRejected(state, action))
      .addCase(getCardById.fulfilled, (state, action: PayloadAction<CardProps>) => {
        handleFulfilled(state);
        const index = state.cards.findIndex(card => card._id === action.payload._id);
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
      })

      // Create card
      .addCase(createCard.pending, (state) => handlePending(state))
      .addCase(createCard.rejected, (state, action) => handleRejected(state, action))
      .addCase(createCard.fulfilled, (state, action: PayloadAction<{ card: CardProps; columnId: string }>) => {
        handleFulfilled(state);
        const { card, columnId } = action.payload;
        // Add to global cards array
        state.cards.push(card);
        // Add to specific column
        const columnIndex = state.columns.findIndex(col => col._id === columnId);
        if (columnIndex !== -1) {
          if (!state.columns[columnIndex].card) {
            state.columns[columnIndex].card = [];
          }
          state.columns[columnIndex].card.push(card);
        }
      })

      // Delete card
      .addCase(deleteCard.pending, (state) => handlePending(state))
      .addCase(deleteCard.rejected, (state, action) => handleRejected(state, action))
      .addCase(deleteCard.fulfilled, (state, action: PayloadAction<CardProps>) => {
        handleFulfilled(state);
        state.cards = state.cards.filter((card) => card._id !== action.payload._id);
        // Remove from column
        const columnIndex = state.columns.findIndex(col => col._id === action.payload.columnId);
        if (columnIndex !== -1) {
          state.columns[columnIndex].card = state.columns[columnIndex].card.filter(
            card => card._id !== action.payload._id
          );
        }
      })

      // Edit card
      .addCase(editCard.pending, (state) => handlePending(state))
      .addCase(editCard.rejected, (state, action) => handleRejected(state, action))
      .addCase(editCard.fulfilled, (state, action: PayloadAction<CardProps>) => {
        handleFulfilled(state);
        const index = state.cards.findIndex((card) => card._id === action.payload._id);
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
        // Update in column
        const columnIndex = state.columns.findIndex(col => col._id === action.payload.columnId);
        if (columnIndex !== -1) {
          const cardIndex = state.columns[columnIndex].card.findIndex(
            card => card._id === action.payload._id
          );
          if (cardIndex !== -1) {
            state.columns[columnIndex].card[cardIndex] = action.payload;
          }
        }
      })

      // DnD movement
      .addCase(dndMovement.pending, (state) => handlePending(state))
      .addCase(dndMovement.rejected, (state, action) => handleRejected(state, action))
      .addCase(dndMovement.fulfilled, (state, action: PayloadAction<ColumnProps[]>) => {
        handleFulfilled(state);
        state.columns = action.payload;
      });
  },
});

export const { setCards, setFilter, updateColumnCards } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
