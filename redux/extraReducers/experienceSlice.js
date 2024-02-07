import { createSlice } from "@reduxjs/toolkit";

export const jobObj = {
  Title: "",
  Company: "",
  Location: "",
  Start: "",
  End: "",
  Description: "",
};

export const experienceSlice = createSlice({
  name: 'experience',
  initialState: {
    active: false,
    Jobs: []
  },
  reducers: {
    addJob: (state, action) => {
      state.Jobs.push(action.payload);
    },
    removeJob: (state, action) => {
      const index = action.payload;
      state.Jobs.splice(index, 1);
    },
    setJob: (state, action) => {
      state.Jobs[action.payload.index] = action.payload.job;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    }
  }
});

export const { addJob, removeJob, setJob, setActive } = experienceSlice.actions;

export default experienceSlice.reducer;