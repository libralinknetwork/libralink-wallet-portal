import { FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import WalletWithdrawConfirmView, {
  ConfirmStatus,
} from "../views/wallet/WalletWithdrawConfirmView";
import { routes } from "../config/routes";
import { ErrorCode, withdrawConfirm } from "../api/wallet-withdraw-confirm";

// @ts-ignore
import { useSnackbar } from "libralink-portal-shared/lib/snackbar";
// @ts-ignore
import { useGlobalState } from "libralink-portal-shared/lib/global";
// @ts-ignore
import { useIsAuthenticated } from "libralink-portal-shared/lib/auth";

import {
  ApplicationError,
  UnauthenticatedError,
  // @ts-ignore
} from "libralink-portal-shared/errors";

type Props = {
  redirectTo?: string;
};

const WalletWithdrawConfirmContainer: FC<Props> = (props) => {
  const snackbar = useSnackbar();

  const [globalState, globalDispatch] = useGlobalState();
  const [authState, authDispatch] = useIsAuthenticated();

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [status, setStatus] = useState<ConfirmStatus>();
  const [withdrawAmount, setWithdrawAmount] = useState<number>();
  const [withdrawAddress, setWithdrawAddress] = useState<string>();
  const [withdrawError, setWithdrawError] = useState<ErrorCode>();

  const handleBackToWallet = () => {
    navigate(props.redirectTo || routes.index, { replace: true });
  };

  useEffect(() => {
    const code = searchParams.get("code");
    const hash = searchParams.get("hash");

    if (!code || !hash) {
      return navigate(routes.index);
    }

    globalDispatch({ type: "LOADING" });

    const withdrawConfirmPromise = withdrawConfirm(code, hash);

    withdrawConfirmPromise
      .then((value) => {
        if (value.failureReasonCode) {
          setStatus("error");
          setWithdrawError(value.failureReasonCode);
        } else {
          setStatus("success");
          setWithdrawAmount(value.amount);
          setWithdrawAddress(value.toAddress);
        }

        globalDispatch({ type: "STANDBY" });
      })
      .catch((error) => {
        if (error instanceof UnauthenticatedError) {
          authDispatch({
            type: "LOGOUT",
          });
        } else if (error instanceof ApplicationError) {
          snackbar.error(error.errorCode);
        } else {
          console.log(error);
        }

        globalDispatch({ type: "STANDBY" });
      });
  }, []);

  return (
    <WalletWithdrawConfirmView
      status={status}
      amount={withdrawAmount}
      address={withdrawAddress}
      error={withdrawError}
      onBackToWallet={handleBackToWallet}
    />
  );
};

export default WalletWithdrawConfirmContainer;
