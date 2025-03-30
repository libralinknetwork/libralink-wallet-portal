import { useEffect } from "react";

export const useMetaTag = (name = "", issue: any) => {
  useEffect(() => {
    // Change the meta tag if provided
    if (!!name && !!issue) {
        const el = document.querySelector(`meta[name='${name}']`);
        if (!!el) {
          el.setAttribute('content', issue?.title)
        }
    }
  }, [name, issue]);
};