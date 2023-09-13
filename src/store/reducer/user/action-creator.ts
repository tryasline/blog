import { AppDispatch } from "../../store";
import { userSlice } from "./user-slice";
import { actionAccount } from "../../../components/API/API";
import { userSignUp, uptadeUser } from "../../../components/API/API";
import { SetCookie, RemoveCookie, GetCookie } from "../../../hook/Cookies";

export const fetchSignUp = (user: userSignUp) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await actionAccount.signUp(user);
      if (res.data.user) {
        RemoveCookie("userToken");
        SetCookie("userToken", JSON.stringify(res.data.user.token));
        dispatch(userSlice.actions.signUp(res.data.user));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchAuth = (data?: any) => {
  return async (dispatch: AppDispatch) => {
    try {
      const userJson = localStorage.getItem("userData");
      if (userJson) {
        const { email, password } = JSON.parse(userJson);
        const user = { email, password };
        const res = await actionAccount.signIn(user);
        if (res.data.user) {
          RemoveCookie("userToken");
          SetCookie("userToken", JSON.stringify(res.data.user.token));
        }
        dispatch(userSlice.actions.signUp(res.data.user));
      } else if (data) {
        const res = await actionAccount.signIn(data);
        if (res.data.user) {
          RemoveCookie("userToken");
          SetCookie("userToken", JSON.stringify(res.data.user.token));
        }
        dispatch(userSlice.actions.signUp(res.data.user));
      } else return;
    } catch (e) {
      console.log(e);
    }
  };
};

export const fetchUpdate = (user: uptadeUser, token: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      const res = await actionAccount.update(user, token);

      if (res.data.user) {
        RemoveCookie("userToken");
        SetCookie("userToken", JSON.stringify(res.data.user.token));
        dispatch(userSlice.actions.signUp(res.data.user));
      }
    } catch (e) {
      console.log(e);
    }
  };
};

export const logOut = () => {
  localStorage.removeItem("userData");
  RemoveCookie("userToken");
  return userSlice.actions.logOut();
};
