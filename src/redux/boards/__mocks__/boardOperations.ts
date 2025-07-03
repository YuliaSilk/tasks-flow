import { createAsyncThunk } from '@reduxjs/toolkit';
import { BoardProps, ColumnProps } from '../../../types/interfaces';

export const getBoardById = createAsyncThunk<BoardProps, string>(
  'boards/getBoardById',
  async (boardId) => {
    return { _id: boardId } as BoardProps;
  }
);

export const fetchBoards = createAsyncThunk<BoardProps[], void>(
  'boards/fetchBoards',
  async () => {
    return [];
  }
);

export const createBoard = createAsyncThunk<BoardProps, { title: string; columns: ColumnProps[] }>(
  'boards/createBoard',
  async ({ title, columns }) => {
    return {
      _id: 'new-board-id',
      title,
      columns: columns.map(col => ({
        ...col,
        boardId: 'new-board-id',
        key: `${col._id}-key`
      }))
    } as BoardProps;
  }
);

export const deleteBoard = createAsyncThunk<BoardProps, string>(
  'boards/deleteBoard',
  async (boardId) => {
    return { _id: boardId } as BoardProps;
  }
); 