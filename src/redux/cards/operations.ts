import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {CardProps, GetCardByIdProps, EditCardProps, DeleteCardProps, DndMovementPayload} from "../../types/interfaces";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const fetchCards = createAsyncThunk<CardProps[]>(
 "cards/fetchTitleStatus",
 async (_, thunkAPI) => {
  try {
    const res = await axios.get(`/api/cards`);
    console.log('fetchCards: ', res.data);
    return res.data;  
  } catch(error) {
    return thunkAPI.rejectWithValue(error.message);
  }
 },
);

export const createCard = createAsyncThunk(
  "cards/createCard",
  async ({ title, description, columnId, boardId }: { title: string; description: string; columnId: string; boardId: string }, { dispatch }) => {
    const response = await axios.post(`/api/boards/${boardId}/columns/${columnId}/cards`, {
      title,
      description,
    });

    return { card: response.data, columnId };
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
      const res = await axios.put(`/api/boards/${boardId}/columns/${columnId}/cards/${_id}`, { title, description });
      console.log('editCard: ', res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk<CardProps, DeleteCardProps>(
  "cards/deleteCard",
  async ({ boardId, columnId, _id }, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/boards/${boardId}/columns/${columnId}/cards/${_id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const dndMovement = createAsyncThunk(
  'cards/dndMovement',
  async (
      { boardId, cardId: _id, sourceColumnId: startColumnID , destinationColumnId: finishColumnID }: DndMovementPayload,
      thunkAPI
  ) => {
      try {
          const res = await axios.patch(`/api/boards/${boardId}/columns/${finishColumnID}/cards/dnd/${_id}`, {
              startColumnID,
              finishColumnID,
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


