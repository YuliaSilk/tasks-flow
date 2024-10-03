import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {CardProps} from "../../types/types";

axios.defaults.baseURL = "http://localhost:3001";

interface CreateCardProps {
  title: string;
  description: string;
  boardId: string; 
  columnId: string; 
}

interface GetCardByIdProps {
  boardId: string; 
  columnId: string; 
  _id: string;
}


interface EditCardProps {
  boardId: string ; 
  columnId: string ; 
  title: string;
  description: string;
  _id: string;
}

interface DeleteCardProps {
  boardId: string; 
  columnId: string; 
  _id: string;
}


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

export const createCard = createAsyncThunk<CardProps, CreateCardProps>(
 "cards/createCardStatus",
 async ({ title, description, boardId, columnId }, thunkAPI) => {
    try{
        const res = await axios.post(`/api/boards/${boardId}/columns/${columnId}/cards`, { title, description });
        console.log('createCard: ', res.data);
        return res.data;
       } catch(error) {
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
      console.log('deleteCard: ', res.data);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
