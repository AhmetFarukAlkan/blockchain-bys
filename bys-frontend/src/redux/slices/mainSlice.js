import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  user: undefined,
  expandedSize: '350px',
  preferences: {
    isDarkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
  },
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setExpandedSize(state, action) {
      state.expandedSize = action.payload;
    },
    setDarkMode(state, action) {
      state.preferences.isDarkMode = action.payload;
    }
  }
});

export const {setUser, setExpandedSize, setDarkMode} = mainSlice.actions;
