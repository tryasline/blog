import { AppDispatch } from '../../store';
import { actionAccount, userSignUp, uptadeUser } from '../../../components/API/API';
import { SetCookie, RemoveCookie, GetCookie } from '../../../hook/Cookies';

import { userSlice } from './user-slice';

export const fetchSignUp = (user: userSignUp) => async (dispatch: AppDispatch) => {
  try {
    const res = await actionAccount.signUp(user);
    if (res.data.user) {
      RemoveCookie('userToken');
      SetCookie('userToken', JSON.stringify(res.data.user.token));
      dispatch(userSlice.actions.signUp(res.data.user));
    }
  } catch (e) {
    console.log(e);
  }
};

export const fetchAuth = (data?: any) => async (dispatch: AppDispatch) => {
  try {
    const userJson = localStorage.getItem('userData');
    if (userJson) {
      const { email, password } = JSON.parse(userJson);
      const user = { email, password };
      const res = await actionAccount.signIn(user);
      if (res.data.user) {
        RemoveCookie('userToken');
        SetCookie('userToken', JSON.stringify(res.data.user.token));
      }
      dispatch(userSlice.actions.signUp(res.data.user));
    } else if (data) {
      const res = await actionAccount.signIn(data);
      if (res.data.user) {
        RemoveCookie('userToken');
        SetCookie('userToken', JSON.stringify(res.data.user.token));
      }
      dispatch(userSlice.actions.signUp(res.data.user));
    }
  } catch (e) {
    console.log(e);
  }
};

export const fetchUpdate = (user: uptadeUser, token: string) => async (dispatch: AppDispatch) => {
  try {
    const res = await actionAccount.update(user, token);

    if (res.data.user) {
      RemoveCookie('userToken');
      SetCookie('userToken', JSON.stringify(res.data.user.token));
      dispatch(userSlice.actions.signUp(res.data.user));
    }
  } catch (e) {
    console.log(e);
  }
};

export const logOut = () => {
  localStorage.removeItem('userData');
  RemoveCookie('userToken');
  return userSlice.actions.logOut();
};
