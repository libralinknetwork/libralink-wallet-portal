// @ts-ignore
import { jsonHeader, fetch } from "libralink-portal-shared/lib/fetch";

// @ts-ignore
import { runOnSuccess } from "libralink-portal-shared/utils";

// const request = (currency: string) => {
//   return fetch(
//     `/api/balance/withdraw_allowed?currency=${currency}`,
//     {
//       method: "GET",
//       headers: {
//         ...jsonHeader(),
//       },
//     },
//     { refreshable: false }
//   );
// };

export type WithdrawAllowedResponse = {
  userId: string;
  allowed: boolean;
  token: string;
};

export const getWithdrawAllowed = async (payload: {
  currency: string;
}): Promise<WithdrawAllowedResponse> => {
  // const res = await request(payload.currency);

  // return await runOnSuccess(res, async () => {
  //   return await res.json();
  // });

  return Promise.resolve(
    { userId: "668698c5-c9bf-482e-a7d7-bd3514da6fc5", allowed: true, token: "22cf88ed-7012-4c4a-9df9-cb31e32b540d" }
  );
};
