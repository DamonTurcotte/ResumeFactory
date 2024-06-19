import { createSlice } from "@reduxjs/toolkit";
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

const getProfileMap = (state) => ({
  meta: state?.meta || {},
  personal: personalSlice.reducer(state?.personal, {}),
  objective: objectiveSlice.reducer(state?.objective, {}),
  summary: summarySlice.reducer(state?.summary, {}),
  highlights: highlightSlice.reducer(state?.highlights, {}),
  experience: experienceSlice.reducer(state?.experience, {}),
  volunteer: volunteerSlice.reducer(state?.volunteer, {}),
  education: educationSlice.reducer(state?.education, {}),
  skills: skillSlice.reducer(state?.skills, {}),
  certificates: certificateSlice.reducer(state?.certificates, {}),
  projects: projectSlice.reducer(state?.projects, {}),
  publications: publicationSlice.reducer(state?.publications, {}),
  languages: languageSlice.reducer(state?.languages, {}),
  references: referenceSlice.reducer(state?.references, {}),
  options: templateOptionSlice.reducer(state?.options, {}),
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState: getProfileMap(),
  reducers: {
    initProfile: (state, action) => ({
        ...state,
        ...getProfileMap(action.payload),
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(personalSlice.actions.setPersonal, (state, action) => {
      state.personal = personalSlice.reducer(state.personal, action);
    });
  },
});

export const { initProfile } = profileSlice.actions;

export default profileSlice.reducer;