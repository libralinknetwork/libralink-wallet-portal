import { routes } from "config/routes";

import { AuthGuard } from "guards/AuthGuard";

import MainLayout from "layouts/MainLayout";

// @ts-ignore
import WalletApp from "libralink-portal-wallet/App";

const MainRoutes = {
  path: routes.index,
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: `${routes.wallet}/*`,
      element: <WalletApp />,
    }    
  ],
};

export default MainRoutes;
