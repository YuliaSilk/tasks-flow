import { createSlice } from '@reduxjs/toolkit';
import {  BoardsState } from '../../types/interfaces';
import {
  fetchBoards,
  createBoard,
  getBoardById,
  deleteBoard,
} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState: BoardsState = {
  boards: [],
  currentBoard: null,
  isLoading: false,
  error: null,
};

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
      setBoards(state, action) {
        state.boards = action.payload;
      }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBoards.pending, handlePending)
            .addCase(fetchBoards.rejected, handleRejected)
            .addCase(fetchBoards.fulfilled, (state, action) => {
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

            .addCase(getBoardById.fulfilled, (state, action) => {
              state.isLoading = false;
              state.error = null;
           
              state.currentBoard = {
                _id: action.payload._id,
                title: action.payload.title,
                columns: action.payload.columns.map((col) => ({
                  _id: col._id,
                  name: col.name,
                  cards: col.card || [], 
                })),
              };
           })
    
            .addCase(createBoard.pending, handlePending)
            .addCase(createBoard.rejected, handleRejected)
            .addCase(createBoard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.boards.push(action.payload);
            })

            .addCase(deleteBoard.pending, handlePending)
            .addCase(deleteBoard.rejected, handleRejected)
            .addCase(deleteBoard.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.boards = state.boards.filter((board) => board._id !== action.payload);
            });   
    }
});

export const boardsReducer = boardsSlice.reducer;