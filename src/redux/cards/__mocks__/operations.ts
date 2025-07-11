import { createAsyncThunk } from '@reduxjs/toolkit';
import { CardProps, DeleteCardProps, EditCardProps } from '../../../types/interfaces';

export const deleteCard = createAsyncThunk<CardProps, DeleteCardProps>(
  'cards/deleteCard',
  async ({ boardId, columnId, _id }) => {
    return { boardId, columnId, _id } as CardProps;
  }
);

export const editCard = createAsyncThunk<CardProps, EditCardProps>(
  'cards/editCard',
  async ({ boardId, columnId, _id, title, description }) => {
    return { boardId, columnId, _id, title, description } as CardProps;
  }
);

