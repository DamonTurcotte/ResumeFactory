import { createSlice } from '@reduxjs/toolkit';

export const personalSlice = createSlice({
  name: 'personal',
  initialState: {
    active: 'N/A',
    data: {
      Name: "",
      Email: "",
      Phone: "",
      Location: "",
      Website: "",
      LinkedIn: "",
      GitHub: ""
    }
  },
  reducers: {
    setPersonal: (state, action) => {
      state.data = action.payload.data;
    },
  }
});

export const { setPersonal } = personalSlice.actions;

export default personalSlice.reducer;