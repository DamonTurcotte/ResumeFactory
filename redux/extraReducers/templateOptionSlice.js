import { createSlice } from "@reduxjs/toolkit";

export const templateOptionObj = {
  size: 'letter',
  templateOptions: {
    templateName: {
      color: 'default',
      font: 'default',
      margin: 'default',
      padding: 'default',
      order: [],
    }
  },
};

export const templateOptionSlice = createSlice({
  name: 'options',
  initialState: {
    size: 'letter',
    templateOptions: {},
  },
  reducers: {
    setOptions: (state, action) => {
      state.size = action.payload.options.size;
      state.templateOptions = Object.entries(action.payload.options).reduce((acc, [key, value]) => {
        if (key !== 'size') {
          acc[key] = value;
        }
        return acc;
      }, {});
    },
  }
});

export const { setOptions } = templateOptionSlice.actions;

export default templateOptionSlice.reducer;