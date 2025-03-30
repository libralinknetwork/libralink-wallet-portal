import { useEffect } from "react";

export const usePageTitle = (title = "") => {
  useEffect(() => {
    // Change the page title if provided
    if (!!title) {
      document.title = title;
    }
  }, [title]);
};