import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ColumnProps } from '../../types/types';

axios.defaults.baseURL = 'http://localhost:3001';

const BOARD_ID = "replace_with_your_board_id"; 

export const getAllColumns = createAsyncThunk<ColumnProps[]>(
  'columns/getAllColumns',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`/api/boards/${BOARD_ID}/columns`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const getColumnsById = createAsyncThunk<ColumnProps, string>(
    'columns/getById',
    async (id, thunkAPI) => {
      try {
        const response = await axios.get(`/api/boards/${BOARD_ID}/columns/${id}`);
        return response.data;
      } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );
  

  export const getColumnsAndCardsByBoardId = createAsyncThunk(
    "boards/getColumnsAndCards",
    async (boardId: string) => {
      const response = await axios.get(`/boards/${boardId}/columns`); // Fetch columns for the board
      const columns = response.data;
  
      // Assuming each column has a property `cards` to fetch cards
      const columnsWithCards = await Promise.all(columns.map(async (column: any) => {
        const cardsResponse = await axios.get(`/columns/${column.id}/cards`); // Fetch cards for each column
        return {
          ...column,
          cards: cardsResponse.data,
        };
      }));
  
      return columnsWithCards; // Return the columns with their respective cards
    }
  );

  // export const addColumn = createAsyncThunk<ColumnProps, { name: string }>(
  //   'columns/addColumn',
  //   async ({ name }, thunkAPI) => {
  //     try {
  //       const response = await axios.post(`/api/boards/${BOARD_ID}/columns`, { name });
  //       return response.data;
  //     } catch (error: any) {
  //       return thunkAPI.rejectWithValue(error.message);
  //     }
  //   }
  // );
