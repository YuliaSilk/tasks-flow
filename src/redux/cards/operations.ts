import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {CardProps, GetCardByIdProps, EditCardProps, DeleteCardProps, DndMovementPayload, ColumnProps} from "../../types/interfaces";
import { RootState } from "../store";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const fetchCards = createAsyncThunk<
  { cards: CardProps[]; columns: ColumnProps[] },
  void,
  { state: RootState }
>(
  "cards/fetchTitleStatus",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const boardId = state.boards.currentBoard?._id;
      
      if (!boardId) {
        throw new Error("No board selected");
      }

      const res = await axios.get(`/api/boards/${boardId}`);
      console.log('fetchCards response:', res.data);

      // Get current columns from the board
      const currentColumns = res.data.columns || [];
      
      // Update cards in their respective columns
      const updatedColumns = currentColumns.map(column => ({
        ...column,
        card: column.card || [] // API returns 'card'
      }));

      // Flatten all cards into a single array
      const allCards = updatedColumns.reduce((acc: CardProps[], col) => {
        return acc.concat(col.card || []);
      }, []);

      return {
        cards: allCards,
        columns: updatedColumns
      };
    } catch (error) {
      console.error('Error fetching cards:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createCard = createAsyncThunk<
  { card: CardProps; columnId: string },
  { title: string; description: string; columnId: string; boardId: string },
  { rejectValue: string }
>(
  "cards/createCard",
  async ({ title, description, columnId, boardId }, thunkAPI) => {
    try {
      if (!boardId || !columnId || boardId === 'undefined' || columnId === 'undefined') {
        throw new Error('Invalid board or column ID');
      }

      const response = await axios.post(`/api/boards/${boardId}/columns/${columnId}/cards`, {
        title,
        description,
      });

      if (!response.data || !response.data._id) {
        throw new Error('Invalid response from server');
      }

      // Ensure the card has all required fields
      const card: CardProps = {
        ...response.data,
        boardId,
        columnId,
      };

      return { card, columnId };
    } catch (error) {
      console.error('Error creating card:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getCardById = createAsyncThunk<CardProps, GetCardByIdProps>(
 "cards/getCardById",
 async ({ boardId, columnId, _id }, thunkAPI) => {
  try {
    const res = await axios.get(`/api/boards/${boardId}/columns/${columnId}/cards/${_id}`);
    console.log('getCardById: ', res.data);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
 }
);

export const editCard = createAsyncThunk<CardProps, EditCardProps>(
  "cards/editCard",
  async ({ boardId, columnId, title, description, _id }, thunkAPI) => {
    try {
      if (!boardId || !columnId || !_id || 
          boardId === 'undefined' || columnId === 'undefined' || _id === 'undefined') {
        throw new Error('Invalid board, column, or card ID');
      }

      if (!title || !description) {
        throw new Error('Title and description are required');
      }

      const res = await axios.put(`/api/boards/${boardId}/columns/${columnId}/cards/${_id}`, { 
        title, 
        description 
      });

      if (!res.data || !res.data._id) {
        throw new Error('Invalid response from server');
      }

      // Ensure the response has all required fields
      const updatedCard: CardProps = {
        ...res.data,
        boardId,
        columnId,
      };

      console.log('editCard: ', updatedCard);
      return updatedCard;
    } catch (error) {
      console.error('Error editing card:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk<CardProps, DeleteCardProps>(
  "cards/deleteCard",
  async ({ boardId, columnId, _id }, thunkAPI) => {
    try {
      if (!boardId || !columnId || !_id || 
          boardId === 'undefined' || columnId === 'undefined' || _id === 'undefined') {
        throw new Error('Invalid board, column, or card ID');
      }

      const res = await axios.delete(`/api/boards/${boardId}/columns/${columnId}/cards/${_id}`);
      
      if (!res.data || !res.data._id) {
        throw new Error('Invalid response from server');
      }

      // Ensure the response has all required fields
      const deletedCard: CardProps = {
        ...res.data,
        boardId,
        columnId,
      };

      return deletedCard;
    } catch (error) {
      console.error('Error deleting card:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const dndMovement = createAsyncThunk(
  'cards/dndMovement',
  async (payload: DndMovementPayload, thunkAPI) => {
      try {
          const res = await axios.patch(`/api/boards/${payload.boardId}/columns/${payload.destinationColumnId}/cards/dnd/${payload.cardId}`, {
              startColumnID: payload.sourceColumnId,
              finishColumnID: payload.destinationColumnId,
          });
          return res.data;  
      } catch (error) {
          return thunkAPI.rejectWithValue(error.message);  
      }
  }
);

export const updateStatusLocalThunk = createAsyncThunk<
  { card: CardProps; currentColumnId: string; newColumnId: string; newCardIdx: number }, 
  { _id: string } 
>(
  'cards/updateStatusLocal',
  async ({ _id }, thunkAPI) => {
      try {
        const response = await axios.patch(`/api/cards/${_id}`, { _id });
        
        const { card, currentColumnId, newColumnId, newCardIdx } = response.data;

        return { card, currentColumnId, newColumnId, newCardIdx }; 
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);  
    }
});


export const updateCardsOrder = createAsyncThunk<
  { columnId: string; newCards: CardProps[] },
  { columnId: string; newCards: CardProps[] }
>(
  'cards/updateOrder',
  async (payload) => {
    return payload;
  }
);

