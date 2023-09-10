import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../../../types/user-types";

const initialState: User = {
  username: "",
  email: "",
  token: "",
  bio: "",
  image: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUp(state, action: PayloadAction<User>) {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.bio = action.payload.bio;
      state.image = action.payload.image;
    },
  },
});
