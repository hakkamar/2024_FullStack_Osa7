import { createSlice } from "@reduxjs/toolkit";

import loginService from "../services/login";
import storage from "../services/storage";

import { setNotification } from "../reducers/notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    removeUser() {
      const user = null;
      return user;
    },
  },
});

let message = "";
let type = "success";

export const haeJaAsetaUser = (credentials) => {
  //console.log("haeJaAsetaUser - credentials", credentials);

  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);

      message = `Welcome back, ${user.name}`;
      type = "success";
      dispatch(setNotification({ message, type }, 5));

      dispatch(setUser(user));
      storage.saveUser(user);
    } catch (error) {
      message = "Wrong credentials";
      type = "error";
      dispatch(setNotification({ message, type }, 5));
    }
  };
};

export const poistaUser = (user) => {
  return async (dispatch) => {
    try {
      dispatch(removeUser());

      message = `Bye, ${user.name}!`;
      type = "success";
      dispatch(setNotification({ message, type }, 5));

      storage.removeUser();
    } catch (error) {
      console.log("error", error);
      message = error.message;
      type = "error";
      dispatch(setNotification({ message, type }, 5));
    }
  };
};

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
