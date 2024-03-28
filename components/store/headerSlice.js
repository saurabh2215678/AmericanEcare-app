import { createSlice } from '@reduxjs/toolkit';

export const headerSlice = createSlice({
    name: 'header',
    initialState: {
      value: true,
    },
    reducers: {
      showHeader : (state) => {
        state.value = true;
      },
      hideHeader : (state) => {
        state.value = false;
      },
      toggleHeader : (state) => {
        state.value = !state.value;
      }
    },
  });
export const { showHeader, hideHeader, toggleHeader } = headerSlice.actions;
export default headerSlice.reducer