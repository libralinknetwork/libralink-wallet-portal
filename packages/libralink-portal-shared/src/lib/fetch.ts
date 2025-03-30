export type ExtendedResponse = Response & {
  retry: (init: RequestInit) => Promise<ExtendedResponse>;
};

type Options = {
  refreshable?: boolean;
};

export const fetch = async (
  input: RequestInfo,
  init?: RequestInit,
  options?: Options
): Promise<ExtendedResponse> => {
  const res = await window.fetch(input, init);

  return res.clone() as ExtendedResponse;
};

export const jsonHeader = () =>
  ({ "Content-Type": "application/json" } as const);
