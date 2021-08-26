import { configureStore } from '@reduxjs/toolkit';
import rememberReducer from './counter/rememberSlice';
import loadingReducer from './counter/loadingSlice';

export const store = configureStore({
  reducer: {
    remember: rememberReducer,
    loading: loadingReducer,
  },
});
