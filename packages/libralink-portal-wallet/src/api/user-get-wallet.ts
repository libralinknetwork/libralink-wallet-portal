// @ts-ignore
import { jsonHeader, fetch } from "libralink-portal-shared/lib/fetch";

// @ts-ignore
import { runOnSuccess } from "libralink-portal-shared/utils";

// const request = () => {
//   return fetch(
//     "/api/wallet/user-get-eth-address",
//     {
//       method: "GET",
//       headers: {
//         ...jsonHeader(),
//       },
//     },
//     { refreshable: false }
//   );
// };

export const getUserWallet = async (): Promise<any> => {
  // const res = await request();
  // return await runOnSuccess(res, async () => {
  //   return await res.json();
  // });

  return Promise.resolve({ address: '0x12345'} )
};
