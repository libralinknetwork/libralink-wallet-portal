import { FC } from "react";
import WalletWithdrawConfirmConfirmedView from "./WalletWithdrawConfirmConfirmedView";
import WalletWithdrawConfirmFailedView from "./WalletWithdrawConfirmFailedView";
import { ErrorCode } from "../../api/wallet-withdraw-confirm";

export type ConfirmStatus = "success" | "error";

type Props = {
  status?: ConfirmStatus;
  amount?: number;
  address?: string;
  error?: ErrorCode;
  onBackToWallet: () => void;
};

const WalletWithdrawConfirmView: FC<Props> = (props) => {
  if (props.status === "success") {
    return (
      <WalletWithdrawConfirmConfirmedView
        amount={props.amount}
        address={props.address}
        onBackToWallet={props.onBackToWallet}
      />
    );
  }

  if (props.status === "error") {
    return (
      <WalletWithdrawConfirmFailedView
        error={props.error}
        onBackToWallet={props.onBackToWallet}
      />
    );
  }

  return null;
};

export default WalletWithdrawConfirmView;
