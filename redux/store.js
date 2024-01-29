import { configureStore } from '@reduxjs/toolkit';
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem';
import profileReducer from './profileSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
};

const rootReducer = persistReducer(persistConfig, profileReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);