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
    projects: []
  },
  reducers: {
    addProject: (state, action) => {
      state.projects.push(action.payload);
    },
    removeProject: (state, action) => {
      const index = action.payload;
      state.projects.splice(index, 1);
    },
    setProject: (state, action) => {
      state.projects[action.payload.index] = action.payload.project;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addProject, removeProject, setProject, setActive } = projectSlice.actions;

export default projectSlice.reducer;