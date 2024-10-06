import { createSlice } from '@reduxjs/toolkit';
import { BoardProps } from '../../types/types';
import {
  fetchBoards,
  createBoard,
  getBoardById

} from './operations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

interface ColumnProps {
  _id: string | number;
  name: string;
  cards: {
    _id: string | number;
    title: string;
    description: string;
    boardId: string | number;
    columnId: string | number;
  } [];
}

interface CurrentBoard {
  _id: string | number;
  title: string;
  columns: ColumnProps[];
}

interface BoardsState {
  currentBoard: CurrentBoard | null; 
  boards: BoardProps[]; 
  isLoading: boolean;
  error: string | null;
}

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
              console.log('fetchBoards.fulfilled: ', action.payload);
              state.isLoading = false;
              state.error = null;
              state.boards = action.payload;
          })

            .addCase(getBoardById.fulfilled, (state, action) => {
              console.log('Full API response:', action.payload); 
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
                console.log('createBoard.fulfilled: ', action.payload);
                state.isLoading = false;
                state.error = null;
                state.boards.push(action.payload);
            })
    }
});

export const boardsReducer = boardsSlice.reducer;