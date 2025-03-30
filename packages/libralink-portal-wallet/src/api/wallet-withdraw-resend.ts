// @ts-ignore
import { jsonHeader, fetch } from "libralink-portal-shared/lib/fetch";

// @ts-ignore
import { runOnSuccess } from "libralink-portal-shared/utils";

const request = (balanceId: string) => {
  return fetch(
    `/api/balance/withdraw_resend?balance_id=${balanceId}`,
    {
      method: "GET",
      headers: {
        ...jsonHeader(),
      },
    },
    { refreshable: false }
  );
};

export type WithdrawResendResponse = {
  userId: string;
  maskedEmail: string;
};

export const withdrawResend = async (
  balanceId: string
): Promise<WithdrawResendResponse> => {
  const res = await request(balanceId);

  return await runOnSuccess(res, async () => {
    return await res.json();
  });
};
