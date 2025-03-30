// @ts-ignore
import { jsonHeader, fetch } from "libralink-portal-shared/lib/fetch";

// @ts-ignore
import { runOnSuccess } from "libralink-portal-shared/utils";

// const request = (currency: string) => {
//   return fetch(
//     `/api/bonus/summary?currency=${currency}`,
//     {
//       method: "GET",
//       headers: {
//         ...jsonHeader(),
//       },
//     },
//     { refreshable: false }
//   );
// };

export type BonusSummaryResponse = {
  amount: number;
  userId: string;
};

export const getUserBonusSummary = async (payload: {
  currency: string;
}): Promise<BonusSummaryResponse> => {
  // const res = await request(payload.currency);

  // return await runOnSuccess(res, async () => {
  //   return await res.json();
  // });

  return Promise.resolve({
    amount: 10.1,
    userId: "bc5706f4-57b0-4804-846f-70a3a0ae37f9"
  });  
};
