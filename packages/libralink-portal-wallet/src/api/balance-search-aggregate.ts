// @ts-ignore
import { jsonHeader, fetch } from "libralink-portal-shared/lib/fetch";

// @ts-ignore
import { runOnSuccess } from "libralink-portal-shared/utils";

// const request = (currency: string, fromDate?: number, toDate?: number) => {
//   return fetch(
//     "/api/balance/aggregate",
//     {
//       method: "POST",
//       headers: {
//         ...jsonHeader(),
//       },
//       body: JSON.stringify({
//         currency,
//         fromDate: !!fromDate ? fromDate / 1000 : null,
//         toDate: !!toDate ? toDate / 1000 : null,
//       }),
//     },
//     { refreshable: false }
//   );
// };

export type BalanceAggregateResponse = {
  deposit: number;
  revenue: number;
  payment: number;
  withdrawal: number;
  headIssueRevenue: number;
  lvl1Revenue: number;
  lvl2Revenue: number;
  lvl3Revenue: number;
};

export const getUserBalanceSumByTx = async (payload: {
  currency: string;
  fromDate?: number;
  toDate?: number;
}): Promise<BalanceAggregateResponse> => {
  // const res = await request(payload.currency, payload.fromDate, payload.toDate);

  // return await runOnSuccess(res, async () => {
  //   return await res.json();
  // });

  return Promise.resolve(
    {
      deposit: 100.0,
      revenue: 10.0,
      payment: 20.0,
      withdrawal: 10.0,
      headIssueRevenue: 10.0,
      lvl1Revenue: 11,
      lvl2Revenue: 12,
      lvl3Revenue: 13
    }
  );
};
