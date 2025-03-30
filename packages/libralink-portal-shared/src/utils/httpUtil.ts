import { ExtendedResponse } from "lib/fetch";

import { ApplicationError, UnauthenticatedError } from "errors";

export const runOnSuccess = async (
  res: ExtendedResponse,
  onSuccess: () => Promise<any>
) => {
  if (res.status === 401 || res.status === 403) {
    throw new UnauthenticatedError();
  } else if (!res.ok) {
    const err = await res.json();
    throw new ApplicationError(err.code);
  }

  return onSuccess();
};
