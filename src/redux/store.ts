import { configureStore } from '@reduxjs/toolkit';
import { boardsReducer } from './boards/slice';
import { columnsReducer } from './columns/slice';
import { cardsReducer } from './cards/slice';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { RootState } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['currentBoard'],
};

const persistedReducer = persistReducer(persistConfig, boardsReducer);

export const store = configureStore({
  reducer: {
    currentBoard: persistedReducer,
    boards: boardsReducer,
    columns: columnsReducer,
    cards: cardsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

// Export pre-typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



