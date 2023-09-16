import Cookies from 'js-cookie';

export const SetCookie = (nameCookie: string, value: string) => {
  Cookies.set(nameCookie, value, { expires: 1 });
};

export const GetCookie = (nameCookie: string) => Cookies.get(nameCookie);
export const RemoveCookie = (nameCookie: string) => {
  Cookies.remove(nameCookie);
};
