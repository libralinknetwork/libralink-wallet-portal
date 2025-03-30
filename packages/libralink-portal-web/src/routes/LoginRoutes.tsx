import { routes } from "config/routes";

import { NoAuthGuard } from "guards/NoAuthGuard";

import LoginLayout from "layouts/LoginLayout";

import LoginContainer from "containers/LoginContainer";
import FaqContainer from "containers/FaqContainer";
import LandingContainer from "containers/LandingContainer";

const LoginRoutes = {
  path: routes.index,
  element: (
    <NoAuthGuard>
      <LoginLayout />
    </NoAuthGuard>
  ),
  children: [
    {
      path: routes.index,
      element: <LandingContainer />,
    },
    {
      path: routes.login,
      element: <LoginContainer />,
    },
    {
      path: routes.faq,
      element: <FaqContainer />,
    },
  ],
};

export default LoginRoutes;
