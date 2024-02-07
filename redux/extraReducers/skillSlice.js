import { createSlice } from "@reduxjs/toolkit";

export const skillObj = {
  Name: "",
  Proficiency: ""
};

export const skillSlice = createSlice({
  name: "skills",
  initialState: {
    active: false,
    skills: []
  },
  reducers: {
    addSkill: (state, action) => {
      state.skills.push(action.payload);
    },
    removeSkill: (state, action) => {
      state.skills = state.skills.filter((skill) => skill.Name !== action.payload);
    },
    setSkill: (state, action) => {
      const index = action.payload.index;
      state.skills[index] = action.payload.skill;
    },
    setActive: (state, action) => {
      state.active = action.payload;
    }
  }
});

export const { addSkill, removeSkill, setSkill, setActive } = skillSlice.actions;

export default skillSlice.reducer;