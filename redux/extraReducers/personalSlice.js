import { createSlice } from '@reduxjs/toolkit';

const personalSlice = createSlice({
  name: 'personal',
  initialState: {
    Name: '',
    Email: '',
    Phone: '',
    Location: '',
    Website: '',
    LinkedIn: '',
    GitHub: ''
  },
  reducers: {
    setPersonal: (state, action) => {
      state.Name = action.payload.Name;
      state.Email = action.payload.Email;
      state.Phone = action.payload.Phone;
      state.Location = action.payload.Location;
      state.Website = action.payload.Website;
      state.LinkedIn = action.payload.LinkedIn;
      state.GitHub = action.payload.GitHub;
    }
  }
});

export const { setPersonal } = personalSlice.actions;

export default personalSlice.reducer;