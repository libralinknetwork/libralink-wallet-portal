import Cookies from "js-cookie";
import {
  SIGN_IN_URL,
  SIGN_OUT_URL,
  // @ts-ignore
} from "libralink-portal-shared/config/constants";

export type LoginType = "public";

const LOGIN_TYPE_KEY = "loginType";

const useLogin = () => {
  const loginType = localStorage.getItem(LOGIN_TYPE_KEY) as LoginType | null;

  const login = (loginType: LoginType, remember: boolean) => {
    // if (remember) {
    //   localStorage.setItem(LOGIN_TYPE_KEY, loginType);
    // } else {
    //   localStorage.removeItem(LOGIN_TYPE_KEY);
    // }

    // window.location.href = SIGN_IN_URL;

    Cookies.set("libra-token", 'value')
    window.location.href = "/"    
  };

  const logout = () => {
    localStorage.removeItem(LOGIN_TYPE_KEY);
    
    // window.location.href = SIGN_OUT_URL;
    Cookies.remove("libra-token")
    window.location.href = "/"
  };

  return { loginType, login, logout };
};

export default useLogin;
