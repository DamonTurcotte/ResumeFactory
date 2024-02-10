import { createSlice } from "@reduxjs/toolkit";

export const jobObj = {
  Title: "",
  Company: "",
  Location: "",
  Start: "",
  End: "",
  Duties: [],
};

export const experienceSlice = createSlice({
  name: 'experience',
  initialState: {
    active: false,
    data: []
  },
  reducers: {
    addJob: (state, action) => {
      state.data.push(action.payload.data);
    },
    removeJob: (state, action) => {
      const index = action.payload.index;
      state.data.splice(index, 1);
    },
    setJob: (state, action) => {
      state.data[action.payload.index] = action.payload.data;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    }
  }
});

export const { addJob, removeJob, setJob, setActive } = experienceSlice.actions;

export default experienceSlice.reducer;