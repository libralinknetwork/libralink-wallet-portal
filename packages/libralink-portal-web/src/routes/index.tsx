import { Navigate, useRoutes } from "react-router-dom";

import { routes } from "config/routes";

import { AuthGuard } from "guards/AuthGuard";

import NotFoundView from "views/NotFoundView";

// @ts-ignore
import WalletWithdrawConfirm from "libralink-portal-wallet/WalletWithdrawConfirm";

import LoginRoutes from "./LoginRoutes";
import MainRoutes from "./MainRoutes";

export default function Routes() {
  return useRoutes([
    {
      path: routes.withdraw,
      element: (
        <AuthGuard>
          <WalletWithdrawConfirm redirectTo={routes.wallet} />
        </AuthGuard>
      ),
    },
    LoginRoutes,
    MainRoutes,

    { path: routes.notFound, element: <NotFoundView /> },
    {
      path: "*",
      element: <Navigate to={routes.notFound} replace />,
    },
  ]);
}
