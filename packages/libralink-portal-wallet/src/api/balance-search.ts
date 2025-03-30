// @ts-ignore
import { jsonHeader, fetch } from "libralink-portal-shared/lib/fetch";

// @ts-ignore
import { runOnSuccess } from "libralink-portal-shared/utils";

// const request = (
//   currency: string,
//   from: number,
//   size: number,
//   fromDate?: number,
//   toDate?: number
// ) => {
//   return fetch(
//     `/api/balance/search?page=${from}&size=${size}`,
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

export type UserBalanceTxType =
  | "DEPOSIT"
  | "PAYMENT"
  | "REFUND"
  | "BONUS"
  | "BALANCE_TRANSFER"
  | "REVENUE"
  | "WITHDRAWAL"
  | "LVL1_REVENUE"
  | "LVL2_REVENUE"
  | "LVL3_REVENUE"
  | "LVL1_CONTRIB"
  | "LVL2_CONTRIB"
  | "LVL3_CONTRIB"
  | "SYSTEM_ISSUE_REVENUE"
  | "HEAD_ISSUE_REVENUE";

export type UserBalanceStatus =
  | "COMPLETED"
  | "PENDING"
  | "CONFIRM"
  | "PROCESSING";

export type UserBalance = {
  id: string;
  userId: string;
  activityId: string;
  amount: number;
  fee: number;
  currency: string;
  txType: UserBalanceTxType;
  createdAt: string;
  status: UserBalanceStatus;
  hash: string;
  note: string;
  confirmRequestCreatedAt: number | null;
};

export type BalanceSearchResponse = {
  total: number;
  balances: UserBalance[];
};

export const getUserBalanceItems = async (payload: {
  currency: string;
  from: number;
  size: number;
  fromDate?: number;
  toDate?: number;
}): Promise<BalanceSearchResponse> => {
  // const res = await request(
  //   payload.currency,
  //   payload.from,
  //   payload.size,
  //   payload.fromDate,
  //   payload.toDate
  // );

  // return await runOnSuccess(res, async () => {
  //   return await res.json();
  // });

  return Promise.resolve({ total: 1000, balances: [] });
};
