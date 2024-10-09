import { createSelector } from 'reselect';

export const selectColumns = state => state.columns.columns;
export const selectIsLoading = state => state.columns.isLoading;
export const selectError = state => state.columns.error;

export const memoizedColumnsSelector = createSelector(
  [selectColumns],
  (columns) => columns
);

const selectCards = state => state.cards;
const selectColumnId = (_, columnId) => columnId;

export const selectCardsByColumnId = createSelector(
  [selectCards, selectColumnId],
  (cards, columnId) => cards.filter(card => card.columnId === columnId)
);