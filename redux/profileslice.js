import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
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
    setName: (state, action) => {
      state.Name = action.payload;
    },
    setEmail: (state, action) => {
      state.Email = action.payload;
    },
    setPhone: (state, action) => {
      state.Phone = action.payload;
    },
    setLocation: (state, action) => {
      state.Location = action.payload;
    },
    setWebsite: (state, action) => {
      state.Website = action.payload;
    },
    setLinkedIn: (state, action) => {
      state.LinkedIn = action.payload;
    },
    setGitHub: (state, action) => {
      state.GitHub = action.payload;
    }
  }
});

export const { setName, setEmail, setPhone, setLocation, setWebsite, setLinkedIn, setGitHub } = profileSlice.actions;

export default profileSlice.reducer;