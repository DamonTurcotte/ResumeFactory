import { createSlice } from "@reduxjs/toolkit";

export const templateOptionObj = {
  size: 'letter',
  templateOptions: {
    template: {
      colorIndex: 0,
      margin: 1.00,
      fontSize: 14,
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
    setSize: (state, action) => {
      state.size = action.payload.size;
    },
    setOptions: (state, action) => {
      state.templateOptions = {
        ...state.templateOptions,
        [action.payload.template]: {
          ...state.templateOptions[action.payload.template],
          ...action.payload.options,
        }
      };
    }
  },
});

export const { setSize, setOptions } = templateOptionSlice.actions;

export default templateOptionSlice.reducer;