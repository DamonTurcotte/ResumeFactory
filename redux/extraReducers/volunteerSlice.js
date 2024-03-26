import { createSlice } from "@reduxjs/toolkit";

export const volunteerObj = {
  Title: "",
  Company: "",
  Location: "",
  Start: "",
  End: "",
  Duties: [],
};

export const volunteerSlice = createSlice({
  name: 'volunteer',
  initialState: {
    active: false,
    data: []
  },
  reducers: {
    addPosition: (state, action) => {
      state.data.push(action.payload.data);
    },
    removePosition: (state, action) => {
      const index = action.payload.index;
      state.data.splice(index, 1);
    },
    setPosition: (state, action) => {
      state.data[action.payload.index] = action.payload.data;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    }
  }
});

export const { addPosition, removePosition, setPosition, setActive} = volunteerSlice.actions;

export default volunteerSlice.reducer;