import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const store = configureStore({
    reducer: {
      user: userReducer,
      // Add more slices here as needed
    },
  });
  
  export default store;