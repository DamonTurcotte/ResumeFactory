import { createSlice } from "@reduxjs/toolkit";

export const objectiveSlice = createSlice({
  name: "objective",
  initialState: {
    active: false,
    data: "",
  },
  reducers: {
    setObjective: (state, action) => {
      state.data = action.payload.data;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    }
  },
});

export const { setObjective, setActive } = objectiveSlice.actions;

export default objectiveSlice.reducer;