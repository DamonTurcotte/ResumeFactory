import { createSlice } from "@reduxjs/toolkit";
import personalSlice from "./extraReducers/personalSlice";
import personalReducer, { setPersonal } from "./extraReducers/personalSlice";

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    currentProfile: null,
    profiles: {},
  },
  reducers: {
    addProfile: (state, action) => {
      if (Object.keys(state.profiles).includes(action.payload)) {
        return;
      } else {
        state.profiles[action.payload] = {
          personal: personalSlice(undefined, {}),
        }
      }
    },
    removeProfile: (state, action) => {
      delete state.profiles[action.payload];
      if (state.currentProfile === action.payload) {
        state.currentProfile = null;
      }
    },
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(setPersonal, (state, action) => {
      state.profiles[state.currentProfile].personal = personalReducer(state.profiles[state.currentProfile].personal, action);
    });
  }
});

export const { addProfile, removeProfile, setCurrentProfile } = profileSlice.actions;

export default profileSlice.reducer;