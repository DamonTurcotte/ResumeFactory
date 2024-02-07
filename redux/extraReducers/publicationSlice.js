import { createSlice } from "@reduxjs/toolkit";

export const publicationObj = {
  Title: "",
  Publisher: "",
  Date: "",
  URL: "",
  Description: ""
};

export const publicationSlice = createSlice({
  name: "publications",
  initialState: {
    active: false,
    publications: []
  },
  reducers: {
    addPublication: (state, action) => {
      state.publications.push(action.payload);
    },
    removePublication: (state, action) => {
      const index = action.payload;
      state.publications.splice(index, 1);
    },
    setPublication: (state, action) => {
      state.publications[action.payload.index] = action.payload.publication;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    }
  }
});

export const { addPublication, removePublication, setPublication, setActive } = publicationSlice.actions;

export default publicationSlice.reducer;