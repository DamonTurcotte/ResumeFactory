import { createSlice } from "@reduxjs/toolkit";

export const summarySlice = createSlice({
  name: "summary",
  initialState: {
    active: false,
    data: "",
  },
  reducers: {
    setSummary: (state, action) => {
      state.data = action.payload.data;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    }
  },
});

export const { setSummary, setActive } = summarySlice.actions;

export default summarySlice.reducer;