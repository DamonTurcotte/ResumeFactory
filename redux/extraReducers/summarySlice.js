import { createSlice } from "@reduxjs/toolkit";

export const summarySlice = createSlice({
  name: "summary",
  initialState: {
    active: false,
    Summary: "",
  },
  reducers: {
    setSummary: (state, action) => {
      state.Summary = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    }
  },
});

export const { setSummary, setActive } = summarySlice.actions;

export default summarySlice.reducer;