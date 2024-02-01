import { createSlice } from "@reduxjs/toolkit";

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
      state.Jobs.splice(action.payload, 1);
    },
    editJob: (state, action) => {
      state.Jobs[action.payload.index] = action.payload.job;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    }
  }
});

export const { addJob, removeJob, editJob, setActive } = experienceSlice.actions;

export default experienceSlice.reducer;