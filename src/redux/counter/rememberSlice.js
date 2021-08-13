import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  check: false,
};

export const rememberSlice = createSlice({
  name: 'remember',
  initialState,
  reducers: {
    remember: (state, action) => {
      state.check = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { remember } = rememberSlice.actions;

export default rememberSlice.reducer;
