import { createSlice } from '@reduxjs/toolkit';

const makeMetaData = (title) => {
  const timestamp = Date.now().toString();
  return {
    id: timestamp,
    title,
    lastUpdate: timestamp,
  };
};

export const metaDataSlice = createSlice({
  name: 'meta',
  initialState: {
    resumes: {},
    letters: {},
  },
  reducers: {
    createResumeMetaData: (state, action) => {
      const title = action.payload.title;
      if (!title || title.trim().length === 0) return state;
      const meta = makeMetaData(title);
      return {
        ...state,
        resumes: {
          ...state.resumes,
          [meta.id]: meta,
        },
      }
    },
    createLetterMetaData: (state, action) => {
      const title = action.payload.title;
      if (!title || title.trim().length === 0) return state;
      const meta = makeMetaData(title);
      return {
        ...state,
        letters: {
          ...state.letters,
          [meta.id]: meta,
        },
      }
    },
  },
});

export const { createResumeMetaData, createLetterMetaData } = metaDataSlice.actions;

export default metaDataSlice.reducer;