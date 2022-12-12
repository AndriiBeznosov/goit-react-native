import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: null,
    isError: null,
  },
  reducers: {
    isLoginOn(state, action) {
      return (state = action.payload);
    },
  },
});

export const { isLoginOn } = authSlice.actions;
