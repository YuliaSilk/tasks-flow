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
  id: string;
}


interface EditCardProps {
  boardId: string ; 
  columnId: string ; 
  title: string;
  description: string;
  id: string;
}

interface DeleteCardProps {
  boardId: string; 
  columnId: string; 
  id: string;
}


export const fetchCards = createAsyncThunk<CardProps[]>(
 "cards/fetchTitleStatus",
 async (_, thunkAPI) => {
  try {
    const res = await axios.get(`/api/cards`);
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
        return res.data;
       } catch(error) {
return thunkAPI.rejectWithValue(error.message);
       }
    }
);

export const getCardById = createAsyncThunk<CardProps, GetCardByIdProps>(
 "cards/getCardById",
 async ({ boardId, columnId, id }, thunkAPI) => {
  try {
    const res = await axios.get(`/api/boards/${boardId}/columns/${columnId}/cards/${id}`);
    return res.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
 }
);

export const editCard = createAsyncThunk<CardProps, EditCardProps>(
  "cards/editCard",
  async ({ boardId, columnId, title, description, id }, thunkAPI) => {
    try {
      const res = await axios.put(`/api/boards/${boardId}/columns/${columnId}/cards/${id}`, { title, description });
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk<CardProps, DeleteCardProps>(
  "cards/deleteCard",
  async ({ boardId, columnId, id }, thunkAPI) => {
    try {
      const res = await axios.delete(`/api/boards/${boardId}/columns/${columnId}/cards/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
