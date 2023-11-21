import { configureStore } from '@reduxjs/toolkit'
import userSliceReducer from './userSlice';
import productSliceReducer from './ProductSlice';

export const store =  configureStore({
  reducer: {
    user:userSliceReducer,
    product:productSliceReducer
  },
});

export default store;