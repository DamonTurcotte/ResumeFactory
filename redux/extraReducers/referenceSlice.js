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
    data: [],
  },
  reducers: {
    addReference: (state, action) => {
      state.data.push(action.payload.data);
    },
    removeReference: (state, action) => {
      const index = action.payload.index;
      state.data.splice(index, 1);
    },
    setReference: (state, action) => {
      state.data[action.payload.index] = action.payload.data;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    },
  },
});

export const { addReference, removeReference, setReference, setActive } = referenceSlice.actions;

export default referenceSlice.reducer;