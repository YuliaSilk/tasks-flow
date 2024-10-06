import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCards, createCard, getCardById, editCard, deleteCard } from './operations';
import { CardProps } from '../../types/types';
interface CardsState {
  cards: CardProps[];
  isLoading: boolean;
  error: string | null;
  filter: string;
  
}

const initialState: CardsState = {
  cards: [{
    _id: '',
    title: '',
    description: '',
    boardId: '',
    columnId: '',
  }],
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
        console.log('fetchCards.fulfilled: ', action.payload);
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
        console.log('getCardById.fulfilled: ', action.payload);
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
      });
    
  },
});

export const { setFilter } = cardSlice.actions;

export const cardsReducer = cardSlice.reducer;
