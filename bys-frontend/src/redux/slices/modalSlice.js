import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals: [],
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    addModal(state, action) {
      state.modals.push(action.payload);
    },
    removeModal(state, action) {
      state.modals = state.modals.filter((modal) => modal.name !== action.payload.name);
    },
    removeCurrentModal(state) {
      state.modals.pop();
    },
    clearAllModals(state) {
      state.modals = [];
    },
  },
});

export const { addModal, removeModal, removeCurrentModal, clearAllModals } = modalSlice.actions;
