import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../../types/user-types";

const initialState: User = {
  username: "",
  email: "",
  token: "",
  bio: "",
  image: "",
  isAuth: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUp(state, action: PayloadAction<User>) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.bio = action.payload.bio;
      state.image = action.payload.image;
      state.isAuth = true;
    },
    logOut(state) {
      state.username = "";
      state.email = "";
      state.token = "";
      state.bio = "";
      state.image = "";
      state.isAuth = false;
    },
  },
});

export default userSlice.reducer;
