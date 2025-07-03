import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
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

interface FetchCardsResponse {
  cards: CardProps[];
  columns: ColumnProps[];
}

interface CreateCardResponse {
  card: CardProps;
  columnId: string;
}

const handlePending = (state: CardsStateWithStatus) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: CardsStateWithStatus,
  action: { error: SerializedError; payload: unknown }
) => {
  state.isLoading = false;
  state.error = action.error.message || (action.payload as string) || 'An error occurred';
};

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
        state.columns[columnIndex].cards = newCards;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, handlePending)
      .addCase(fetchCards.rejected, handleRejected)
      .addCase(fetchCards.fulfilled, (state, action: PayloadAction<FetchCardsResponse>) => {
        state.isLoading = false;
        state.error = null;
        state.cards = action.payload.cards;
        state.columns = action.payload.columns;
      })

      .addCase(getCardById.pending, handlePending)
      .addCase(getCardById.rejected, handleRejected)
      .addCase(getCardById.fulfilled, (state, action: PayloadAction<CardProps>) => {
        state.isLoading = false;
        state.error = null;
        const index = state.cards.findIndex(card => card._id === action.payload._id);
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
      })

      .addCase(createCard.pending, handlePending)
      .addCase(createCard.rejected, handleRejected)
      .addCase(createCard.fulfilled, (state, action: PayloadAction<CreateCardResponse>) => {
        state.isLoading = false;
        state.error = null;
        state.cards.push(action.payload.card);
      })

      .addCase(deleteCard.pending, handlePending)
      .addCase(deleteCard.rejected, handleRejected)
      .addCase(deleteCard.fulfilled, (state, action: PayloadAction<CardProps>) => {
        state.isLoading = false;
        state.error = null;
        state.cards = state.cards.filter((card) => card._id !== action.payload._id);
      })

      .addCase(editCard.pending, handlePending)
      .addCase(editCard.rejected, handleRejected)
      .addCase(editCard.fulfilled, (state, action: PayloadAction<CardProps>) => {
        state.isLoading = false;
        state.error = null;
        const index = state.cards.findIndex((card) => card._id === action.payload._id);
        if (index !== -1) {
          state.cards[index] = action.payload;
        }
      })

      .addCase(dndMovement.pending, handlePending)
      .addCase(dndMovement.rejected, handleRejected)
      .addCase(dndMovement.fulfilled, (state, action: PayloadAction<ColumnProps[]>) => {
        state.isLoading = false;
        state.error = null;
        state.columns = action.payload;
      });
  },
});

export const { setCards, setFilter, updateColumnCards } = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;
