import axios from "axios";
import { createAsyncThunk} from "@reduxjs/toolkit";
import {BoardProps} from "../../types/types";

axios.defaults.baseURL = "http://localhost:3001";

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
 async (_, thunkAPI) => {
  try {
    const res = await axios.post("/api/boards/");
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