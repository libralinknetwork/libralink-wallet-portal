import { FC, ReactNode, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { routes } from "config/routes";

// @ts-ignore
import { useIsAuthenticated } from "libralink-portal-shared/lib/auth";

export const useAuthRedirect = () => {
  const [authState] = useIsAuthenticated();
  const location = useLocation();

  useEffect(() => {
    const { pathname } = location;

    if (!authState.isAuthenticated && pathname) {
      localStorage.setItem("redirectTo", pathname);
    }
  }, [authState.isAuthenticated, location]);
};

type Props = {
  children: ReactNode;
};

export const AuthGuard: FC<Props> = ({ children }) => {
  const [authState] = useIsAuthenticated();

  useAuthRedirect();

  if (!authState.isAuthenticated) {
    return <Navigate to={routes.index} />;
  }

  return <>{children}</>;
};
