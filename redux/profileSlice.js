import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./extraReducers";
import {
  personalSlice,
  objectiveSlice,
  summarySlice,
  highlightSlice,
  experienceSlice,
  volunteerSlice,
  educationSlice,
  skillSlice,
  certificateSlice,
  projectSlice,
  publicationSlice,
  languageSlice,
  referenceSlice,
  templateOptionSlice
} from './extraReducers';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    currentProfile: null,
    profiles: {},
    order: []
  },
  reducers: {
    addProfile: (state, action) => {
      if (!state.profiles.hasOwnProperty(action.payload)) {
        state.profiles[action.payload] = {
          personal: personalSlice.reducer(undefined, {}),
          objective: objectiveSlice.reducer(undefined, {}),
          summary: summarySlice.reducer(undefined, {}),
          highlights: highlightSlice.reducer(undefined, {}),
          experience: experienceSlice.reducer(undefined, {}),
          volunteer: volunteerSlice.reducer(undefined, {}),
          education: educationSlice.reducer(undefined, {}),
          skills: skillSlice.reducer(undefined, {}),
          certificates: certificateSlice.reducer(undefined, {}),
          projects: projectSlice.reducer(undefined, {}),
          publications: publicationSlice.reducer(undefined, {}),
          languages: languageSlice.reducer(undefined, {}),
          references: referenceSlice.reducer(undefined, {}),
          options: templateOptionSlice.reducer(undefined, {}),
        };
        state.order.push(action.payload);
      }
    },
    removeProfile: (state, action) => {
      delete state.profiles[action.payload];
      state.order = state.order.filter((profile) => profile !== action.payload);
      if (state.currentProfile === action.payload) {
        state.currentProfile = null;
      }
    },
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
    setProfileID: (state, action) => {
      const index = state.order.indexOf(action.payload.currentID);
      state.profiles[action.payload.newID] = state.profiles[action.payload.currentID];
      delete state.profiles[action.payload.currentID];
      state.order[index] = action.payload.newID;
      if (state.currentProfile === action.payload.currentID) {
        state.currentProfile = action.payload.newID;
      }
    }
  },
  extraReducers: extraReducers
});

export const { addProfile, removeProfile, setCurrentProfile, setProfileID } = profileSlice.actions;

export default profileSlice.reducer;