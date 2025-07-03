import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { BoardsStateWithStatus } from '../types';
import {
  fetchBoards,
  createBoard,
  getBoardById,
  deleteBoard,
} from './operations';
import { BoardProps } from '../../types/interfaces';

const handlePending = (state: BoardsStateWithStatus) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: BoardsStateWithStatus,
  action: { error: SerializedError; payload: unknown }
) => {
  state.isLoading = false;
  state.error = action.error.message || (action.payload as string) || 'An error occurred';
};

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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, handlePending)
      .addCase(fetchBoards.rejected, handleRejected)
      .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<BoardProps[]>) => {
        state.isLoading = false;
        state.error = null;
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

      .addCase(getBoardById.pending, handlePending)
      .addCase(getBoardById.rejected, handleRejected)
      .addCase(getBoardById.fulfilled, (state, action: PayloadAction<BoardProps>) => {
        state.isLoading = false;
        state.error = null;
        state.currentBoard = {
          _id: action.payload._id,
          title: action.payload.title,
          columns: action.payload.columns.map((col) => ({
            _id: col._id,
            name: col.name,
            boardId: action.payload._id,
            cards: col.cards || [],
          })),
        };
      })

      .addCase(createBoard.pending, handlePending)
      .addCase(createBoard.rejected, handleRejected)
      .addCase(createBoard.fulfilled, (state, action: PayloadAction<BoardProps>) => {
        state.isLoading = false;
        state.error = null;
        state.boards.push(action.payload);
      })

      .addCase(deleteBoard.pending, handlePending)
      .addCase(deleteBoard.rejected, handleRejected)
      .addCase(deleteBoard.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = null;
        state.boards = state.boards.filter((board) => board._id !== action.payload);
        if (state.currentBoard?._id === action.payload) {
          state.currentBoard = null;
        }
      });
  },
});

export const { setBoards } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;