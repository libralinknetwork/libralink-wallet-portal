// @ts-ignore
import { jsonHeader, fetch } from "libralink-portal-shared/lib/fetch";

// @ts-ignore
import { runOnSuccess } from "libralink-portal-shared/utils";

const request = (
  currency: string,
  amount: number,
  amountUsd: number,
  address: string,
  token: string
) => {
  return fetch(
    "/api/balance/withdraw",
    {
      method: "POST",
      headers: {
        ...jsonHeader(),
      },
      body: JSON.stringify({
        currency: currency,
        amount: amount,
        amountUsd: amountUsd,
        address: address,
        token: token,
      }),
    },
    { refreshable: false }
  );
};

export type ErrorCode =
  | "insufficient_funds"
  | "withdraw_blocked"
  | "user_email_not_shared"
  | "withdraw_error";

export type BalanceWithdrawErrorResponse = {
  code: ErrorCode;
  requestTraceId: string;
};

export type BalanceWithdrawSuccessResponse = {
  userId: string;
  maskedEmail: string;
};

export const withdraw = async (payload: {
  amount: number;
  currency: string;
  amountUsd: number;
  address: string;
  token: string;
}): Promise<BalanceWithdrawSuccessResponse> => {
  const res = await request(
    payload.currency,
    payload.amount,
    payload.amountUsd,
    payload.address,
    payload.token
  );

  return await runOnSuccess(res, async () => {
    return await res.json();
  });
};
