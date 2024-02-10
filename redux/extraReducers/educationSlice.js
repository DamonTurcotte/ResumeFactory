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
    data: [],
  },
  reducers: {
    addEducation: (state, action) => {
      state.data.push(action.payload.data);
    },
    removeEducation: (state, action) => {
      const index = action.payload.index;
      state.data.splice(index, 1);
    },
    setEducation: (state, action) => {
      state.data[action.payload.index] = action.payload.data;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addEducation, removeEducation, setEducation, setActive } = educationSlice.actions;

export default educationSlice.reducer;