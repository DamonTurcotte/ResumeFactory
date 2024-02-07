import { createSlice } from "@reduxjs/toolkit";

export const referenceObj = {
  Name: "",
  Position: "",
  Company: "",
  Phone: "",
  Email: ""
};

export const referenceSlice = createSlice({
  name: "references",
  initialState: {
    active: false,
    references: [],
  },
  reducers: {
    addReference: (state, action) => {
      state.references.push(action.payload);
    },
    removeReference: (state, action) => {
      const index = action.payload;
      state.references.splice(index, 1);
    },
    setReference: (state, action) => {
      state.references[action.payload.index] = action.payload.reference;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addReference, removeReference, setReference, setActive } = referenceSlice.actions;

export default referenceSlice.reducer;