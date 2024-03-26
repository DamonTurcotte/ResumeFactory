import { createSlice } from "@reduxjs/toolkit";

export const highlightObj = {
  highlights: [""],
};

export const highlightSlice = createSlice({
  name: 'highlights',
  initialState: {
    active: false,
    data: []
  },
  reducers: {
    addHighlight: (state, action) => {
      state.data.push(action.payload.data);
    },
    removeHighlight: (state, action) => {
      const index = action.payload.index;
      state.data.splice(index, 1);
    },
    setHighlight: (state, action) => {
      state.data[action.payload.index] = action.payload.data;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    }
  }
});

export const { addHighlight, removeHighlight, setHighlight, setActive } = highlightSlice.actions;

export default highlightSlice.reducer;