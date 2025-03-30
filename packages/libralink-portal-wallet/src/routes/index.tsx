import { Navigate, useRoutes } from "react-router-dom";

import { routes } from "config/routes";

import WalletContainer from "containers/WalletContainer";
import WalletWithdrawConfirmContainer from "../containers/WalletWithdrawConfirmContainer";

export default function Routes() {
  return useRoutes([
    { path: routes.index, element: <WalletContainer /> },
    {
      path: routes.withdraw,
      element: <WalletWithdrawConfirmContainer />,
    },    
    {
      path: "*",
      element: <Navigate to={routes.index} replace />,
    },
  ]);
}
