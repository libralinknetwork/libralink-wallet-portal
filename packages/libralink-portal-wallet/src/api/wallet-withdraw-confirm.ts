// @ts-ignore
import { jsonHeader, fetch } from "libralink-portal-shared/lib/fetch";

// @ts-ignore
import { runOnSuccess } from "libralink-portal-shared/utils";

const request = (code: string, hash: string) => {
  return fetch(
    `/api/balance/withdraw_confirm?code=${code}&hash=${hash}`,
    {
      method: "GET",
      headers: {
        ...jsonHeader(),
      },
    },
    { refreshable: false }
  );
};

export type ErrorCode =
  | "failure_request_not_found"
  | "failure_already_used"
  | "failure_invalid_link"
  | "failure_expired_link"
  | "failure_invalid_request";

export type WithdrawConfirmResponse = {
  userId: string;
  amount: number;
  toAddress: string;
  failureReasonCode: ErrorCode | null;
};

export const withdrawConfirm = async (
  code: string,
  hash: string
): Promise<WithdrawConfirmResponse> => {
  const res = await request(code, hash);

  return await runOnSuccess(res, async () => {
    return await res.json();
  });
};
