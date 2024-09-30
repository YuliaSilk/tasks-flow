import { createSlice } from '@reduxjs/toolkit';
import { ColumnProps } from '../../types/types';
import { getAllColumns,  getColumnsById, getColumnsAndCardsByBoardId } from './operations';


const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const columnSlice = createSlice({
    name: 'columns',
    initialState: {
      columns: [] as ColumnProps[],
      isLoading: false,
      error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(getColumnsById.pending, handlePending)
      .addCase(getColumnsById.rejected, handleRejected)
      .addCase(getColumnsById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.columns = [action.payload];
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
          // state.loading = false; // Loading is complete
          state.error = action.error.message || 'Failed to load columns and cards'; // Set error message
        });

        
    },

    
  });
  

export const columnReducer = columnSlice.reducer;