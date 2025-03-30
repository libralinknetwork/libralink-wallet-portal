import LandingView from "views/landing/LandingView";
// @ts-ignore
import { usePageTitle } from "libralink-portal-shared/lib/state-hooks";

const LandingContainer = () => {
  usePageTitle("Landing")

  return <LandingView />;
};

export default LandingContainer;
