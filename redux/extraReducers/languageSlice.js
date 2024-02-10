import { createSlice } from "@reduxjs/toolkit";

export const languageObj = {
  Name: "",
  Proficiency: ""
};

export const languageSlice = createSlice({
  name: "languages",
  initialState: {
    active: false,
    data: [],
  },
  reducers: {
    addLanguage: (state, action) => {
      state.data.push(action.payload.data);
    },
    removeLanguage: (state, action) => {
      const index = action.payload.index;
      state.data.splice(index, 1);
    },
    setLanguage: (state, action) => {
      state.data[action.payload.index] = action.payload.data;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addLanguage, removeLanguage, setLanguage, setActive } = languageSlice.actions;

export default languageSlice.reducer;