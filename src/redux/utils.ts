import { SerializedError } from '@reduxjs/toolkit';
import { BoardsStateWithStatus, CardsStateWithStatus, ColumnsStateWithStatus } from './types';

export type StateWithStatus = BoardsStateWithStatus | CardsStateWithStatus | ColumnsStateWithStatus;

export const handlePending = <T extends StateWithStatus>(state: T) => {
  state.isLoading = true;
  state.error = null;
};

export const handleRejected = <T extends StateWithStatus>(state: T, action: { error: SerializedError }) => {
  state.isLoading = false;
  state.error = action.error;
};

export const handleFulfilled = <T extends StateWithStatus>(state: T) => {
  state.isLoading = false;
  state.error = null;
}; 