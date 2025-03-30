import FaqView from "views/faq/FaqView";
// @ts-ignore
import { usePageTitle } from "libralink-portal-shared/lib/state-hooks";

const FaqContainer = () => {
  usePageTitle("FAQ")

  return <FaqView />;
};

export default FaqContainer;
