import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { BoardsStateWithStatus } from '../types';
import {
  fetchBoards,
  createBoard,
  getBoardById,
  deleteBoard,
} from './operations';
import { BoardProps, CardProps } from '../../types/interfaces';
import { createCard, editCard, deleteCard } from '../cards/operations';
import { fetchCards } from '../cards/operations';

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

const sortBoardsByDate = (boards: BoardProps[]) => {
  return [...boards].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA; // Сортування від найновіших до найстаріших
  });
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
      state.boards = sortBoardsByDate(action.payload);
    },
    clearCurrentBoard(state) {
      state.currentBoard = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoards.pending, handlePending)
      .addCase(fetchBoards.rejected, handleRejected)
      .addCase(fetchBoards.fulfilled, (state, action: PayloadAction<BoardProps[]>) => {
        state.isLoading = false;
        state.error = null;
        state.boards = sortBoardsByDate(action.payload);
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
        state.boards = sortBoardsByDate([...state.boards, action.payload]);
        state.currentBoard = {
          _id: action.payload._id,
          title: action.payload.title,
          columns: action.payload.columns || [],
        };
      })

      .addCase(deleteBoard.pending, handlePending)
      .addCase(deleteBoard.rejected, handleRejected)
      .addCase(deleteBoard.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = null;
        state.boards = sortBoardsByDate(state.boards.filter((board) => board._id !== action.payload));
        state.currentBoard = null;
      })

      // Handle card creation in the board state
      .addCase(createCard.fulfilled, (state, action: PayloadAction<{ card: CardProps; columnId: string }>) => {
        if (state.currentBoard) {
          const column = state.currentBoard.columns.find(col => col._id === action.payload.columnId);
          if (column) {
            if (!column.cards) {
              column.cards = [];
            }
            column.cards.push(action.payload.card);
          }
        }
      })

      // Handle card editing in the board state
      .addCase(editCard.fulfilled, (state, action: PayloadAction<CardProps>) => {
        if (state.currentBoard) {
          const column = state.currentBoard.columns.find(col => col._id === action.payload.columnId);
          if (column && column.cards) {
            const cardIndex = column.cards.findIndex(card => card._id === action.payload._id);
            if (cardIndex !== -1) {
              column.cards[cardIndex] = action.payload;
            }
          }
        }
      })

      // Handle card deletion in the board state
      .addCase(deleteCard.fulfilled, (state, action: PayloadAction<CardProps>) => {
        if (state.currentBoard) {
          const column = state.currentBoard.columns.find(col => col._id === action.payload.columnId);
          if (column && column.cards) {
            column.cards = column.cards.filter(card => card._id !== action.payload._id);
          }
        }
      })

      // Handle cards fetching
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        if (state.currentBoard?._id && action.payload?.columns) {
          const boardId = state.currentBoard._id;
          state.currentBoard.columns = action.payload.columns.map(column => ({
            _id: column._id,
            name: column.name,
            boardId,
            cards: column.cards || []
          }));
        }
      });
  },
});

export const { setBoards, clearCurrentBoard } = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;