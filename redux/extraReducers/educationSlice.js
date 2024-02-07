import { createSlice } from "@reduxjs/toolkit";

export const educationObj = {
  School: "",
  Credential: "",
  Start: "",
  End: "",
  GPA: "",
  Description: ""
};

export const educationSlice = createSlice({
  name: "education",
  initialState: {
    active: false,
    education: [],
  },
  reducers: {
    addEducation: (state, action) => {
      state.education.push(action.payload);
    },
    removeEducation: (state, action) => {
      const index = action.payload;
      state.education.splice(index, 1);
    },
    setEducation: (state, action) => {
      state.education[action.payload.index] = action.payload.education;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addEducation, removeEducation, setEducation, setActive } = educationSlice.actions;

export default educationSlice.reducer;