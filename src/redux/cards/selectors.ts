import { createSelector } from '@reduxjs/toolkit';

export const selectCards = (state) => state.cards.card;
export const selectFilter = (state) => state.cards.filter;
export const selectIsLoading = (state) => state.cards.isLoading;
export const selectError = (state) => state.cards.error;

export const selectVisibleCards = createSelector(
  [selectCards, selectFilter],
  (cards, filter) => {
    return cards.filter(card =>
      card.title.toLowerCase().includes(filter.toLowerCase())
    );
  }
);