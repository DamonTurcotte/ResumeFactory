import { createSlice } from '@reduxjs/toolkit';

const makeMetaData = (title, description) => {
  const timestamp = Date.now().toString();
  return {
    id: timestamp,
    title,
    description,
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
      const description = action.payload.description;
      if (!title || title.trim().length === 0) return state;
      const meta = makeMetaData(title, description);
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
      const description = action.payload.description;
      if (!title || title.trim().length === 0) return state;
      const meta = makeMetaData(title, description);
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