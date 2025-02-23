import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { ColumnProps, ColumnsState } from '../../types/interfaces';
import { getAllColumns, getColumnsById, getColumnsAndCardsByBoardId } from './operations';

const handlePending = (state) => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const initialState: ColumnsState = {
  columns: [] as ColumnProps[], 
  isLoading: false,
  error: null as string | null,
};

const columnSlice = createSlice({
  name: 'columns',
  initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getColumnsById.pending, handlePending)
      .addCase(getColumnsById.rejected, handleRejected)
      .addCase(getColumnsById.fulfilled, (state, action: PayloadAction<ColumnProps>) => {
        state.isLoading = false;
        state.error = null;
        const existingColumnIndex = state.columns.findIndex(column => column._id === action.payload._id);
        if (existingColumnIndex === -1) {
          state.columns.push(action.payload);
        } else {
          state.columns[existingColumnIndex] = action.payload;
        }
      })
    
      .addCase(getAllColumns.pending, handlePending)
      .addCase(getAllColumns.rejected, handleRejected)
      .addCase(getAllColumns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.columns = action.payload;
      })
      .addCase(getColumnsAndCardsByBoardId.pending, handlePending)
      .addCase(getColumnsAndCardsByBoardId.fulfilled, handleRejected)
      .addCase(getColumnsAndCardsByBoardId.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to load columns and cards';
      });
  },
});

export const columnReducer = columnSlice.reducer;
