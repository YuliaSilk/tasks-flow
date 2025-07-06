import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ColumnsStateWithStatus } from '../types';
import {
  getAllColumns,
  getColumnsById,
  getColumnsAndCardsByBoardId,
} from './operations';
import { ColumnProps } from '../../types/interfaces';
import { handlePending, handleRejected, handleFulfilled } from '../utils';

const initialState: ColumnsStateWithStatus = {
  columns: [],
  isLoading: false,
  error: null,
};

const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumns(state, action: PayloadAction<ColumnProps[]>) {
      state.columns = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Get all columns
      .addCase(getAllColumns.pending, (state) => handlePending(state))
      .addCase(getAllColumns.rejected, (state, action) => handleRejected(state, action))
      .addCase(getAllColumns.fulfilled, (state, action: PayloadAction<ColumnProps[]>) => {
        handleFulfilled(state);
        state.columns = action.payload;
      })

      // Get columns by ID
      .addCase(getColumnsById.pending, (state) => handlePending(state))
      .addCase(getColumnsById.rejected, (state, action) => handleRejected(state, action))
      .addCase(getColumnsById.fulfilled, (state, action: PayloadAction<ColumnProps>) => {
        handleFulfilled(state);
        const index = state.columns.findIndex(column => column._id === action.payload._id);
        if (index !== -1) {
          state.columns[index] = action.payload;
        }
      })

      // Get columns and cards by board ID
      .addCase(getColumnsAndCardsByBoardId.pending, (state) => handlePending(state))
      .addCase(getColumnsAndCardsByBoardId.rejected, (state, action) => handleRejected(state, action))
      .addCase(getColumnsAndCardsByBoardId.fulfilled, (state, action: PayloadAction<ColumnProps[]>) => {
        handleFulfilled(state);
        state.columns = action.payload;
      });
  },
});

export const { setColumns } = columnsSlice.actions;
export const columnsReducer = columnsSlice.reducer;
