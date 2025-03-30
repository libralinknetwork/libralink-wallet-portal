import { useState } from "react";
import LoginView from "views/login/LoginView";
// @ts-ignore
import { usePageTitle } from "libralink-portal-shared/lib/state-hooks";
import useLogin, { LoginType } from "../hooks/useLogin";

const LoginContainer = () => {
  usePageTitle("Login");

  const { loginType, login } = useLogin();

  const [logining, setLogining] = useState(false);

  const handleLogin = (loginType: LoginType, remember: boolean) => {
    login(loginType, remember);
    setLogining(true);
  };

  return (
    <LoginView
      logining={logining}
      loginType={loginType}
      onLogin={handleLogin}
    />
  );
};

export default LoginContainer;
