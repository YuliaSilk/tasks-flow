import { createSlice } from '@reduxjs/toolkit';
import { BoardProps, CardProps } from '../../types/types';
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
  id: string | number;
  name: string;
  cards: CardProps[];
}

interface CurrentBoard {
  id: string | number;
  title: string;
  columns: ColumnProps[];
}

interface BoardsState {
  currentBoard: CurrentBoard ; 
  boards: BoardProps[]; 
  isLoading: boolean;
  error: string | null;
}

const initialState: BoardsState = {
  boards: [],
  currentBoard: {
    id: '',
    title: '',
    columns: [
      {
        id: '1',
        name: 'To Do',
        cards: [],
      },
      {
        id: '2',
        name: 'In Progress',
        cards: [],
      },
      {
        id: '3',
        name: 'Done',
        cards: [],
      }
    ],
  },
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

            .addCase(getBoardById.pending, handlePending)
            .addCase(getBoardById.rejected, handleRejected)
            .addCase(getBoardById.fulfilled, (state, action) => {
              console.log('getBoardById.fulfilled: ', action.payload);
              state.isLoading = false;
              state.error = null;
              state.currentBoard = {
                id: action.payload._id,
                title: action.payload.title,
                columns: action.payload.columns.map((col) => ({
                  id: col._id,
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