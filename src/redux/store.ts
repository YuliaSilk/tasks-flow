import { configureStore } from '@reduxjs/toolkit';
import  { boardsReducer } from '../redux/boards/slice'; 
import { columnReducer } from '../redux/columns/slice';
import  { cardsReducer }  from '../redux/cards/slice';
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

  const persistConfig = {
    key: 'root',
    storage,
  };
const persistedReducer = persistReducer(persistConfig, boardsReducer);

export const store = configureStore({
    reducer: {
        currentBoard: persistedReducer,
        boards: boardsReducer,
        columns: columnReducer,
        cards: cardsReducer
    },

    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),

});
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);



