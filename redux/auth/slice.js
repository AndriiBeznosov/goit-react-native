import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  name: "",
  email: "",
  password: "",
  isLogin: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialValue,
  reducers: {
    addUser(state, action) {
      return (state = {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
      });
    },
    logOut(state, action) {
      return (state = {
        ...state,
        isLogin: null,
      });
    },
    isLoginOn(state, action) {
      return (state = {
        ...state,
        isLogin: action.payload.isLogin,
        email: action.payload.email,
        password: action.payload.password,
      });
    },
  },
});

export const { addUser, logOut, isLoginOn } = authSlice.actions;
