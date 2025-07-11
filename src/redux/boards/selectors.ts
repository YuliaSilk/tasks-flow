import { createSelector } from 'reselect';

export const selectLoading = state => state.boards.isLoading;
export const selectAllBoards = state => state.boards.boards;
export const selectBoardById = state => state.boards.currentBoard;
export const selectCurrBoardColumns = state => state.boards.currentBoard.columns;
export const selectCurrBoardCards = state => state.boards.currentBoard.columns.map(col => col.card).flat();
export const selectIsLoading = state => state.boards.isLoading;
export const selectError = state => state.boards.error;

const selectCurrentBoard = (state) => state.boards.currentBoard;

export const memoizedCurrentBoardSelector = createSelector(
  [selectCurrentBoard],
  (currentBoard) => currentBoard
);