import { createSlice } from "@reduxjs/toolkit";

export const objectiveSlice = createSlice({
  name: "objective",
  initialState: {
    active: false,
    Objective: "",
  },
  reducers: {
    setObjective: (state, action) => {
      state.Objective = action.payload;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    }
  },
});

export const { setObjective, setActive } = objectiveSlice.actions;

export default objectiveSlice.reducer;