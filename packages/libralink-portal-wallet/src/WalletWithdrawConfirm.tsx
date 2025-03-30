import { FC } from "react";
import { I18nextProvider } from "react-i18next";

import i18n from "i18n";

import WalletWithdrawConfirmContainer from "./containers/WalletWithdrawConfirmContainer";

const WalletWithdrawConfirm: FC<{
  redirectTo?: string;
}> = ({ redirectTo }) => (
  <I18nextProvider i18n={i18n}>
    <WalletWithdrawConfirmContainer redirectTo={redirectTo} />
  </I18nextProvider>
);

export default WalletWithdrawConfirm;
