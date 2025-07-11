import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BoardsStateWithStatus } from '../types';
import {
  fetchBoards,
  createBoard,
  getBoardById,
  deleteBoard,
} from './operations';
import { BoardProps, CardProps } from '../../types/interfaces';
import { createCard, editCard, deleteCard } from '../cards/operations';
import { handlePending, handleRejected, handleFulfilled } from '../utils';

const initialState: BoardsStateWithStatus = {
  boards: [],
  currentBoard: null,
  isLoading: false,
  error: null,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setBoards(state, action: PayloadAction<BoardProps[]>) {
      state.boards = action.payload;
    },
    clearCurrentBoard(state) {
      state.currentBoard = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch boards
      .addCase(fetchBoards.pending, (state) => handlePending(state))
      .addCase(fetchBoards.rejected, (state, action) => handleRejected(state, action))
      .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<BoardProps[]>) => {
        handleFulfilled(state);
        state.boards = action.payload;
        const selectedBoardId = state.currentBoard?._id;
        const currentBoard = action.payload.find(board => board._id === selectedBoardId);
        if (currentBoard) {
          state.currentBoard = {
            ...currentBoard,
            columns: currentBoard.columns || [],
          };
        }
      })

      // Get board by ID
      .addCase(getBoardById.pending, (state) => handlePending(state))
      .addCase(getBoardById.rejected, (state, action) => handleRejected(state, action))
      .addCase(getBoardById.fulfilled, (state, action: PayloadAction<BoardProps>) => {
        handleFulfilled(state);
        state.currentBoard = {
          _id: action.payload._id,
          title: action.payload.title,
          columns: action.payload.columns.map((col) => ({
            _id: col._id,
            name: col.name,
            boardId: action.payload._id,
            card: col.card || [],
          })),
        };
      })

      // Create board
      .addCase(createBoard.pending, (state) => handlePending(state))
      .addCase(createBoard.rejected, (state, action) => handleRejected(state, action))
      .addCase(createBoard.fulfilled, (state, action: PayloadAction<BoardProps>) => {
        handleFulfilled(state);
        state.boards = [...state.boards, action.payload];
        state.currentBoard = {
          _id: action.payload._id,
          title: action.payload.title,
          columns: action.payload.columns || [],
        };
      })

      // Delete board
      .addCase(deleteBoard.pending, (state) => handlePending(state))
      .addCase(deleteBoard.rejected, (state, action) => handleRejected(state, action))
      .addCase(deleteBoard.fulfilled, (state, action: PayloadAction<string>) => {
        handleFulfilled(state);
        state.boards = state.boards.filter((board) => board._id !== action.payload);
        state.currentBoard = null;
      })

      // Handle card operations
      .addCase(createCard.fulfilled, (state, action: PayloadAction<{ card: CardProps; columnId: string }>) => {
        if (state.currentBoard) {
          const column = state.currentBoard.columns.find(col => col._id === action.payload.columnId);
          if (column) {
            if (!column.card) {
              column.card = [];
            }
            column.card.push(action.payload.card);
          }
        }
      })
      .addCase(editCard.fulfilled, (state, action: PayloadAction<CardProps>) => {
        if (state.currentBoard) {
          const column = state.currentBoard.columns.find(col => col._id === action.payload.columnId);
          if (column && column.card) {
            const cardIndex = column.card.findIndex(card => card._id === action.payload._id);
            if (cardIndex !== -1) {
              column.card[cardIndex] = action.payload;
            }
          }
        }
      })
      .addCase(deleteCard.fulfilled, (state, action: PayloadAction<CardProps>) => {
        if (state.currentBoard) {
          const column = state.currentBoard.columns.find(col => col._id === action.payload.columnId);
          if (column && column.card) {
            column.card = column.card.filter(card => card._id !== action.payload._id);
          }
        }
      });
  },
});

export const { setBoards, clearCurrentBoard } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;