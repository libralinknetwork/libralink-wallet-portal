// @ts-ignore
import { jsonHeader, fetch } from "libralink-portal-shared/lib/fetch";

// @ts-ignore
import { runOnSuccess } from "libralink-portal-shared/utils";

// const request = () => {
//   return fetch(
//     "/wallet/accounts",
//     {
//       method: "GET",
//       headers: {
//         ...jsonHeader(),
//       },
//     },
//     { refreshable: false }
//   );
// };

export type AccountNumber = {
  id: string;
  number: string;
  type: string;
  currency: string;
};

export const getAccounts = async (): Promise<AccountNumber[]> => {
  // const res = await request();

  // return await runOnSuccess(res, async () => {
  //   return await res.json();
  // });

  return Promise.resolve([{
    id: "ETH",
    number: "afe52608-dab5-4398-9a6e-75ad47ffd7a1",
    type: "ETH",
    currency: "ETH" 
  }]);
};
