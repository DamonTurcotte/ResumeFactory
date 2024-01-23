import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter';
import profileReducer from './profileslice';

const store  = configureStore({
  reducer: {
    counter: counterReducer,
    profile: profileReducer
  },
});

export default store;