import { createSlice } from "@reduxjs/toolkit";

export const languageObj = {
  Name: "",
  Proficiency: ""
};

export const languageSlice = createSlice({
  name: "languages",
  initialState: {
    active: false,
    languages: [],
  },
  reducers: {
    addLanguage: (state, action) => {
      state.languages.push(languageObj);
    },
    removeLanguage: (state, action) => {
      const index = action.payload;
      state.languages.splice(index, 1);
    },
    setLanguage: (state, action) => {
      state.languages[action.payload.index] = action.payload.language;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addLanguage, removeLanguage, setLanguage, setActive } = languageSlice.actions;

export default languageSlice.reducer;