// import { createStore } from 'redux';

// const initialState = {
//   loading: false,
// };

// const reducer = (state = initialState, action) => {
//   if (action.type === 'SET_LOADING') {
//     return {
//       ...state,
//       loading: action.value,
//     };
//   }
//   return state;
// };

// const store = createStore(reducer);

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import rememberReducer from './counter/rememberSlice';
import loadingReducer from './counter/loadingSlice';

export const store = configureStore({
  reducer: {
    remember: rememberReducer,
    loading: loadingReducer,
  },
});
