import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: 0,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    increase(state) {
      state.loading += 1;
    },
    decrease(state) {
      state.loading -= 1;
    },
    reset(state) {
      state.loading = 0;
    },
  },
});

export const { increase, decrease, reset } = loadingSlice.actions;
