import { createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit';
import { ColumnsStateWithStatus } from '../types';
import {
  getAllColumns,
  getColumnsById,
  getColumnsAndCardsByBoardId,
} from './operations';
import { ColumnProps } from '../../types/interfaces';

const handlePending = (state: ColumnsStateWithStatus) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (
  state: ColumnsStateWithStatus,
  action: { error: SerializedError; payload: unknown }
) => {
  state.isLoading = false;
  state.error = action.error.message || (action.payload as string) || 'An error occurred';
};

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
      .addCase(getAllColumns.pending, handlePending)
      .addCase(getAllColumns.rejected, handleRejected)
      .addCase(getAllColumns.fulfilled, (state, action: PayloadAction<ColumnProps[]>) => {
        state.isLoading = false;
        state.error = null;
        state.columns = action.payload;
      })

      .addCase(getColumnsById.pending, handlePending)
      .addCase(getColumnsById.rejected, handleRejected)
      .addCase(getColumnsById.fulfilled, (state, action: PayloadAction<ColumnProps>) => {
        state.isLoading = false;
        state.error = null;
        const index = state.columns.findIndex(column => column._id === action.payload._id);
        if (index !== -1) {
          state.columns[index] = action.payload;
        }
      })

      .addCase(getColumnsAndCardsByBoardId.pending, handlePending)
      .addCase(getColumnsAndCardsByBoardId.rejected, handleRejected)
      .addCase(getColumnsAndCardsByBoardId.fulfilled, (state, action: PayloadAction<ColumnProps[]>) => {
        state.isLoading = false;
        state.error = null;
        state.columns = action.payload;
      });
  },
});

export const { setColumns } = columnsSlice.actions;
export const columnsReducer = columnsSlice.reducer;
