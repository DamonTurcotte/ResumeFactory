import { personalSlice } from "./personalSlice";
import { experienceSlice } from "./experienceSlice";

export const extraReducers = (builder) => {
  // Personal Slice Actions
  builder.addCase(personalSlice.actions.setPersonal, (state, action) => {
    state.profiles[state.currentProfile].personal = personalSlice.reducer(state.profiles[state.currentProfile].personal, action);
  });
  // Experience Slice Actions
  builder.addCase(experienceSlice.actions.addJob, (state, action) => {
    state.profiles[state.currentProfile].experience = experienceSlice.reducer(state.profiles[state.currentProfile].experience, action);
  });
  builder.addCase(experienceSlice.actions.removeJob, (state, action) => {
    state.profiles[state.currentProfile].experience = experienceSlice.reducer(state.profiles[state.currentProfile].experience, action);
  });
  builder.addCase(experienceSlice.actions.editJob, (state, action) => {
    state.profiles[state.currentProfile].experience = experienceSlice.reducer(state.profiles[state.currentProfile].experience, action);
  });
  builder.addCase(experienceSlice.actions.setActive, (state, action) => {
    state.profiles[state.currentProfile].experience = experienceSlice.reducer(state.profiles[state.currentProfile].experience, action);
  });
}

export const sliceActivators = {
  experience: experienceSlice.actions.setActive,
}

export {
  personalSlice,
  experienceSlice
}