import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  getStoredState,
  purgeStoredState,
  persistStore,
  persistReducer,
  REGISTER,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  FLUSH,
} from "redux-persist";
import ExpoFileSystemStorage from "redux-persist-expo-filesystem";
import { metaDataSlice } from "./meta";
import { profileSlice, initProfile } from "./profile";

const rootPersistConfig = {
  key: "root",
  storage: ExpoFileSystemStorage,
  blacklist: ["profile"],
};

const rootReducer = (injectedReducers = {}) => combineReducers({
  meta: metaDataSlice.reducer,
  ...injectedReducers,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer());

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

const createProfilePersistConfig = (id) => ({
  key: id,
  keyPrefix: "profile:",
  storage: ExpoFileSystemStorage,
  blacklist: [],
});

export const injectProfile = async (id) => {
 const profileConfig = createProfilePersistConfig(id);
  const profileData = await getStoredState(profileConfig).catch(() => Object());

  store.replaceReducer(persistReducer(
    rootPersistConfig,
    rootReducer({
      profile: persistReducer(profileConfig, profileSlice.reducer),
    })
  ));

  store.dispatch(initProfile(profileData || {}));

  persistor.persist();

  return store.getState();
};