import { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { routes } from "config/routes";

// @ts-ignore
import { useIsAuthenticated } from "libralink-portal-shared/lib/auth";

type Props = {
  children: ReactNode;
};

export const NoAuthGuard: FC<Props> = ({ children }) => {
  const [authState] = useIsAuthenticated();

  if (authState.isAuthenticated) {
    const redirectTo = localStorage.getItem("redirectTo");

    if (redirectTo) {
      localStorage.removeItem("redirectTo");
      return <Navigate to={redirectTo} />;
    }

    return <Navigate to={routes.wallet} />;
  }

  return <>{children}</>;
};
