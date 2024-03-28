import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import headerReducer from './headerSlice';

const store = configureStore({
    reducer: {
      user: userReducer,
      header: headerReducer
      // Add more slices here as needed
    },
  });
  
  export default store;