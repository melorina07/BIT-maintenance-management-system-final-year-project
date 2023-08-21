import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      getUser: (state, action) => {
          state = action.payload;
          return state
      },
      setLanguage: (state, action) => {
          state.lang = action.payload;
      }
  },
  extraReducers: {
  },
});

export default userSlice.reducer;
export const { getUser, setLanguage } = userSlice.actions;