import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";

interface Auth {
  user: User | null;
  isLogin: boolean;
}

const initialState: Auth = {
  user: null,
  isLogin: false,
};

const userAuth = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logOutUser: (state) => {
        state.user = null;
        state.isLogin = false;
      },
  },
});

export const { loginUser,logOutUser } = userAuth.actions;

export default userAuth.reducer;
