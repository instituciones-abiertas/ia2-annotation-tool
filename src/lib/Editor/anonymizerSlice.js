import { createSlice } from '@reduxjs/toolkit';

const anonymizerSlice = createSlice({
  name: 'anonymizer',
  initialState: {
    id: 0,
    text: '',
    annotations: [],
    newAnnotations: [],
    deleteAnnotations: [],
    selectTag: null,
    tags: [
      {
        id: 3,
        name: 'LOC',
        description: 'Es una localización',
        should_anonimyzation: true,
      },
    ],
  },
  reducers: {
    updateAnalysisSuccess: (state, action) => {
      state.text = action.payload.text;
      state.annotations = action.payload.ents;
      state.id = action.payload.id;
    },
    updateTags: (state, action) => {
      state.tags = action.payload;
    },
    updateText: (state, action) => {
      state.text = action.payload;
    },
    updateId: (state, action) => {
      state.id = action.payload;
    },
    updateAnnotations: (state, action) => {
      state.annotations = action.payload;
    },
    updateNewAnnotations: (state, action) => {
      state.newAnnotations = state.newAnnotations.concat(action.payload);
    },
    updateDeleteAnnotations: (state, action) => {
      state.deleteAnnotations = state.deleteAnnotations.concat(action.payload);
    },
    removeNewAnnotations: (state, action) => {
      state.newAnnotations = state.newAnnotations.filter(
        //Only necessary check start
        (item) => item.start !== action.payload.start
      );
    },
    removeDeleteAnnotations: (state, action) => {
      state.deleteAnnotations = state.deleteAnnotations.filter(
        //Only necessary check start
        (item) => item.start !== action.payload.start
      );
    },
    updateSelectTag: (state, action) => {
      state.selectTag = state.tags.find((tag) => tag.name === action.payload);
    },
    clearNewAnnotations: (state) => {
      state.newAnnotations = [];
    },
    clearDeleteAnnotations: (state) => {
      state.deleteAnnotations = [];
    },
  },
});

export const {
  updateText,
  updateAnnotations,
  updateId,
  updateAnalysisSuccess,
  updateTags,
  updateNewAnnotations,
  updateDeleteAnnotations,
  removeDeleteAnnotations,
  removeNewAnnotations,
  updateSelectTag,
  clearNewAnnotations,
  clearDeleteAnnotations,
} = anonymizerSlice.actions;

export default anonymizerSlice.reducer;

export const selectAnonymizer = (state) => state.anonymizer;
