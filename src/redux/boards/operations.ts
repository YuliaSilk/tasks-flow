import axios from "axios";
import { createAsyncThunk} from "@reduxjs/toolkit";
import {BoardProps} from "../../types/interfaces";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const fetchBoards = createAsyncThunk(
 "boards/getAllBoards",
 async (_, thunkAPI) => {
  try {
    const res = await axios.get("/api/boards");
    return res.data;
  } catch(error) {
    return thunkAPI.rejectWithValue(error.message);
  }
 },
);

export const createBoard = createAsyncThunk(
 "boards/createBoard",
 async (boardData: { title: string; columns: any[] }, thunkAPI) => {
  try {
    const res = await axios.post("/api/boards/", boardData);
    return res.data;
  } catch(error) {
    return thunkAPI.rejectWithValue(error.message);
  }
 },
);

export const getBoardById = createAsyncThunk<BoardProps, string>(
 "boards/getBoardById",
 async ( _id: string , thunkAPI ) => {
  try {
    const res = await axios.get(`/api/boards/${_id}`);
    return res.data;
  } catch(error) {
    return thunkAPI.rejectWithValue(error.message);
  }
 });

export const deleteBoard = createAsyncThunk(
 "boards/deleteBoard",
 async (_id: string, thunkAPI) => {
  try {
    const res = await axios.delete(`/api/boards/${_id}`);
    return res.data;
  } catch(error) {
    return thunkAPI.rejectWithValue(error.message);
  }
 },
);

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
// console.log("BASE_URL:", import.meta.env.VITE_BASE_URL);