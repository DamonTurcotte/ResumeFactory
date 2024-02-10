import { createSlice } from "@reduxjs/toolkit";

export const projectObj = {
  Title: "",
  Start: "",
  End: "",
  Description: "",
  Link: "",
};

export const projectSlice = createSlice({
  name: "projects",
  initialState: {
    active: false,
    data: []
  },
  reducers: {
    addProject: (state, action) => {
      state.data.push(action.payload.data);
    },
    removeProject: (state, action) => {
      const index = action.payload.index;
      state.data.splice(index, 1);
    },
    setProject: (state, action) => {
      state.data[action.payload.index] = action.payload.data;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addProject, removeProject, setProject, setActive } = projectSlice.actions;

export default projectSlice.reducer;