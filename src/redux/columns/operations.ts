import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ColumnProps } from '../../types/interfaces';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
console.log("BASE_URL:", process.env.BASE_URL);

export const getAllColumns = createAsyncThunk<ColumnProps[]>(
  'columns/getAllColumns',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as any;
      const boardId = state.boards.currentBoard?._id;

      const response = await axios.get(`/api/boards/${boardId}/columns`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getColumnsById = createAsyncThunk<ColumnProps, string>(
    'columns/getById',
    async (columnId, thunkAPI) => {
      try {
        const state = thunkAPI.getState() as any;
        const boardId = state.boards.currentBoard?._id;
        const response = await axios.get(`/api/boards/${boardId}/columns/${columnId}`);
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  
  export const getColumnsAndCardsByBoardId = createAsyncThunk(
    "boards/getColumnsAndCards",
    async (_id: string, thunkAPI) => {
      const state = thunkAPI.getState() as any;
      const boardId = state.boards.currentBoard?._id;

      const response = await axios.get(`api/boards/${boardId}/columns`);
      const columns = response.data;
  
      const columnsWithCards = await Promise.all(columns.map(async (column: any) => {
        const cardsResponse = await axios.get(`/columns/${column.id}/cards`);
        return {
          ...column,
          cards: cardsResponse.data,
        };
      }));
  
      return columnsWithCards; 
    }
  );

  export const addColumn = createAsyncThunk<ColumnProps, { name: string }>(
    'columns/addColumn',
    async ({ name }, thunkAPI) => {
      try {
        const state = thunkAPI.getState() as any;
        const boardId = state.boards.currentBoard?._id;
        const response = await axios.post(`/api/boards/${boardId}/columns`, { name });
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
