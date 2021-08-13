import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    SET_LOADING: (state, action) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SET_LOADING } = loadingSlice.actions;

export default loadingSlice.reducer;
