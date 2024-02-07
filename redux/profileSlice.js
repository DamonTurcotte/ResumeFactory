import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./extraReducers";
import {
  personalSlice,
  objectiveSlice,
  summarySlice,
  experienceSlice,
  educationSlice,
  skillSlice,
  certificateSlice,
  projectSlice,
  publicationSlice,
  languageSlice,
  referenceSlice,
} from './extraReducers';

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
          personal: personalSlice.reducer(undefined, {}),
          objective: objectiveSlice.reducer(undefined, {}),
          summary: summarySlice.reducer(undefined, {}),
          experience: experienceSlice.reducer(undefined, {}),
          education: educationSlice.reducer(undefined, {}),
          skills: skillSlice.reducer(undefined, {}),
          certificates: certificateSlice.reducer(undefined, {}),
          projects: projectSlice.reducer(undefined, {}),
          publications: publicationSlice.reducer(undefined, {}),
          languages: languageSlice.reducer(undefined, {}),
          references: referenceSlice.reducer(undefined, {}),
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