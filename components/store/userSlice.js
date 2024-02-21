import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
      userData: {}
    },
    reducers: {
      logIn : (state, action) => {
        state.userData = action.payload;
      },
      logOut : (state) => {
        state.userData = null;
      }
    },
  });
export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer