import { configureStore } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage';
import { boardsReducer } from './boards/slice';
import { cardsReducer } from './cards/slice';
import { columnsReducer } from './columns/slice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['boards'],
};

// Create persisted reducer
const persistedBoardsReducer = persistReducer(persistConfig, boardsReducer);

// Configure store with optimized middleware
export const store = configureStore({
  reducer: {
    boards: persistedBoardsReducer,
    cards: cardsReducer,
    columns: columnsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      // Disable thunk middleware if not using it
      thunk: true,
    }),
});

export const persistor = persistStore(store);

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export pre-typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;



