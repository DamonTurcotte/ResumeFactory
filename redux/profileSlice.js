import { createSlice } from "@reduxjs/toolkit";
import personalReducer, { setPersonal } from "./extraReducers/personalSlice";
import experienceReducer, { addJob, removeJob, editJob, setActive as activateExperience } from "./extraReducers/experienceSlice";
import { extraReducers } from "./extraReducers";

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    currentProfile: null,
    profiles: {}
  },
  reducers: {
    addProfile: (state, action) => {
      if (!state.profiles.hasOwnProperty(action.payload)) {
        state.profiles[action.payload] = {
          personal: personalReducer(undefined, {}),
          experience: experienceReducer(undefined, {}),
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
  extraReducers: extraReducers
});

export const { addProfile, removeProfile, setCurrentProfile } = profileSlice.actions;

export default profileSlice.reducer;