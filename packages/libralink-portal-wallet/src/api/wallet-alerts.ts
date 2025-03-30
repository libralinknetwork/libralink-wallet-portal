// @ts-ignore
import { jsonHeader, fetch } from "libralink-portal-shared/lib/fetch";

// @ts-ignore
import { runOnSuccess } from "libralink-portal-shared/utils";

// const request = () => {
//   return fetch(
//     `/api/system/alerts?category=WALLET&code=ALERT_GAS_PRICE_TOO_HIGH&include_expired=false`,
//     {
//       method: "GET",
//       headers: {
//         ...jsonHeader(),
//       },
//     },
//     { refreshable: false }
//   );
// };

export type AlertCategory = "WALLET";

export type AlertCode = "ALERT_GAS_PRICE_TOO_HIGH";

export type Alert = {
  category: AlertCategory;
  code: AlertCode;
  createdAt: string;
  expiresAt: string;
  value1: string;
  value2: string;
};

export type AlertsResponse = Alert[];

export const getAlerts = async (): Promise<AlertsResponse> => {
  // const res = await request();

  // return await runOnSuccess(res, async () => {
  //   return await res.json();
  // });

  return Promise.resolve([{
    category: "WALLET",
    code: "ALERT_GAS_PRICE_TOO_HIGH",
    createdAt: "",
    expiresAt: "",
    value1: "10.0",
    value2: "5"    
  }]);
};
