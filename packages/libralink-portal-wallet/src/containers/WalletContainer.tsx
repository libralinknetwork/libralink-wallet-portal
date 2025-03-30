import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

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

// @ts-ignore
import { usePageTitle } from "libralink-portal-shared/lib/state-hooks";

import { getUserBalanceItems, UserBalance } from "api/balance-search";
import { getUserBalanceSumByTx } from "api/balance-search-aggregate";
import { getUserWallet } from "api/user-get-wallet";
import { withdraw } from "api/wallet-withdraw";
import { getEthFee } from "api/wallet-get-eth-fee";
import { getUserBalanceSummary } from "api/balance-get-summary";
import { getUserBonusSummary } from "api/bonus-get-summary";
import { getWithdrawAllowed } from "api/wallet-withdraw-allowed";
import { withdrawResend } from "api/wallet-withdraw-resend";
import { getAlerts, Alert } from "api/wallet-alerts";
import { getAccounts, AccountNumber } from "api/accounts-get";

import WalletView from "views/wallet/WalletView";

const WalletContainer = () => {
  usePageTitle("My Wallet")

  const { t } = useTranslation();
  const snackbar = useSnackbar();

  const [globalState, globalDispatch] = useGlobalState();
  const [authState, authDispatch] = useIsAuthenticated();
  const [accountId, setAccountId] = useState('');

  const [balancesLoading, setBalancesLoading] = useState(true);

  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();

  const [totalDeposits, setTotalDeposits] = useState<number>(0);
  const [totalWithdrawn, setTotalWithdrawn] = useState<number>(0);
  const [totalPayments, setTotalPayments] = useState<number>(0);
  const [totalRevenue, setTotalRevenue] = useState<number>(0);
  const [totalProjectOwnerRevenue, setTotalProjectOwnerRevenue] =
    useState<number>(0);

  const [totalLvl1Revenue, setLvl1Revenue] = useState<number>(0);
  const [totalLvl2Revenue, setLvl2Revenue] = useState<number>(0);
  const [totalLvl3Revenue, setLvl3Revenue] = useState<number>(0);

  const [activitiesLoading, setActivitiesLoading] = useState(true);
  const [activitiesPage, setActivitiesPage] = useState<number>(0);
  const [activitiesPageSize, setActivitiesPageSize] = useState<number>(10);
  const [userBalancesTotal, setUserBalancesTotal] = useState<number>(0);
  const [userBalances, setUserBalances] = useState<UserBalance[]>([]);

  const [userBalanceSummary, setUserBalanceSummary] = useState<number>(0);
  const [userBonusSummary, setUserBonusSummary] = useState<number>(0);

  const [ethFee, setEthFee] = useState<number>(0);
  const [userWalletAddress, setUserWalletAddress] = useState<string>("");

  const [withdrawAllowed, setWithdrawAllowed] = useState<boolean>(false);
  const [withdrawToken, setWithdrawToken] = useState<string>("");
  const [withdrawEmail, setWithdrawEmail] = useState<string>("");

  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [withdrawConfirmModalOpen, setWithdrawConfirmModalOpen] =
    useState(false);
  const [withdrawConfirmEmailDelay, setWithdrawConfirmEmailDelay] =
    useState(60000); // 60 seconds

  const [alertsLoading, setAlertsLoading] = useState(true);
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const [accountsLoading, setAccountsLoading] = useState(true);
  const [accounts, setAccounts] = useState<AccountNumber[]>([]);

  const handleDepositModalOpen = () => setDepositModalOpen(true);
  const handleDepositModalClose = () => setDepositModalOpen(false);

  const handleWithdrawModalOpen = () => setWithdrawModalOpen(true);
  const handleWithdrawModalClose = () => setWithdrawModalOpen(false);

  const handleWithdrawConfirmModalOpen = () =>
    setWithdrawConfirmModalOpen(true);
  const handleWithdrawConfirmModalClose = () => {
    getWalletData();
    getBalancesData();
    getActivitiesData();
    setWithdrawConfirmModalOpen(false);
  };

  const handleFilter = (values: { fromDate?: Date; toDate?: Date }) => {
    setFromDate(values.fromDate);
    setToDate(values.toDate);
  };

  const handleUserBalancesPageChange = (page: number) => {
    setActivitiesPage(page);
  };
  const handleUserBalancesPageSizeChange = (size: number) => {
    setActivitiesPageSize(size);
    setActivitiesPage(0);
  };

  const handleWithdraw = async (values: {
    accountId: string;
    amount: number;
    amountUsd: number;
    address: string;
  }) => {
    try {
      globalDispatch({ type: "LOADING" });
      const { maskedEmail } = await withdraw({
        currency: values.accountId,
        amount: values.amount,
        amountUsd: values.amountUsd,
        address: values.address,
        token: withdrawToken,
      });

      setWithdrawEmail(maskedEmail);

      handleWithdrawModalClose();
      handleWithdrawConfirmModalOpen();
    } catch (error: any) {
      if (error instanceof UnauthenticatedError) {
        authDispatch({
          type: "LOGOUT",
        });
      } else if (error instanceof ApplicationError) {
        const errorCode = error.errorCode;
        const errorMessage = t(("error." + errorCode) as any);
        snackbar.error(errorMessage);
      } else {
        console.log(error);
      }
    } finally {
      globalDispatch({ type: "STANDBY" });
    }
  };

  const handleResendWithdrawConfirmEmail = async (balanceId: string) => {
    try {
      globalDispatch({ type: "LOADING" });
      await withdrawResend(balanceId);
    } catch (error: any) {
      if (error instanceof UnauthenticatedError) {
        authDispatch({
          type: "LOGOUT",
        });
      } else if (error instanceof ApplicationError) {
        const errorCode = error.errorCode;
        const errorMessage = t(("error." + errorCode) as any);
        snackbar.error(errorMessage);
      } else {
        console.log(error);
      }
    } finally {
      globalDispatch({ type: "STANDBY" });
    }
  };

  const handleAccountIdChange = (accountId: string) => {
    setAccountId(accountId);
  };

  const getWalletData = useCallback(() => {
    globalDispatch({ type: "LOADING" });

    const getUserWalletPromise = getUserWallet();
    const getEthFeePromise = getEthFee();
    const getWithdrawAllowedPromise = getWithdrawAllowed({ currency: accountId });

    Promise.all([
      getUserWalletPromise,
      getEthFeePromise,
      getWithdrawAllowedPromise,
    ])
      .then(([wallet, ethFee, withdrawAllowed]) => {
        setUserWalletAddress(wallet.address);
        setEthFee(ethFee.amount);
        setWithdrawToken(withdrawAllowed.token);
        setWithdrawAllowed(withdrawAllowed.allowed);

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
  }, [accountId]);

  const getBalancesData = useCallback(() => {
    globalDispatch({ type: "LOADING" });
    setBalancesLoading(true);

    const getSummaryByTxPromise = getUserBalanceSumByTx({
      currency: accountId,
      fromDate: fromDate?.getTime(),
      toDate: toDate?.getTime(),
    });
    const getUserBalanceSummaryPromise = getUserBalanceSummary({ currency: accountId });
    const getUserBonusSummaryPromise = getUserBonusSummary({ currency: accountId });

    Promise.all([
      getSummaryByTxPromise,
      getUserBalanceSummaryPromise,
      getUserBonusSummaryPromise,
    ])
      .then(([summaryByTx, summary, bonusSummary]) => {
        setTotalDeposits(summaryByTx.deposit);
        setTotalPayments(summaryByTx.payment);
        setTotalRevenue(summaryByTx.revenue);
        setTotalWithdrawn(summaryByTx.withdrawal);
        setTotalProjectOwnerRevenue(summaryByTx.headIssueRevenue);
        setLvl1Revenue(summaryByTx.lvl1Revenue);
        setLvl2Revenue(summaryByTx.lvl2Revenue);
        setLvl3Revenue(summaryByTx.lvl3Revenue);
        setUserBalanceSummary(summary.amount);
        setUserBonusSummary(bonusSummary.amount);

        setBalancesLoading(false);
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

        setBalancesLoading(false);
        globalDispatch({ type: "STANDBY" });
      });
  }, [accountId, fromDate, toDate]);

  const getActivitiesData = useCallback(() => {
    globalDispatch({ type: "LOADING" });
    setActivitiesLoading(true);

    const getUserBalanceItemsPromise = getUserBalanceItems({
      currency: accountId,
      from: activitiesPage * activitiesPageSize,
      size: activitiesPageSize,
      fromDate: fromDate?.getTime(),
      toDate: toDate?.getTime(),
    });

    getUserBalanceItemsPromise
      .then((userBalances) => {
        setUserBalances(userBalances.balances);
        setUserBalancesTotal(userBalances.total);

        setActivitiesLoading(false);
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

        setActivitiesLoading(false);
        globalDispatch({ type: "STANDBY" });
      });
  }, [accountId, activitiesPage, activitiesPageSize, fromDate, toDate]);

  const getAlertsData = useCallback(() => {
    globalDispatch({ type: "LOADING" });

    const getAlertsPromise = getAlerts();

    getAlertsPromise
      .then((alerts) => {
        setAlerts(alerts);

        setAlertsLoading(false);
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

        setAlertsLoading(false);
        globalDispatch({ type: "STANDBY" });
      });
  }, []);

  const getAccountsData = useCallback(() => {
    globalDispatch({ type: "LOADING" });

    const getAccountsPromise = getAccounts();

    getAccountsPromise
      .then((_accounts) => {
        setAccounts(_accounts);

        if (!accountId && _accounts.length > 0) {
          setAccountId(_accounts[0].id)
        }

        setAccountsLoading(false);
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

        setAccountsLoading(false);
        globalDispatch({ type: "STANDBY" });
      });
  }, []);

  useEffect(() => {
    getWalletData();
  }, [getWalletData]);

  useEffect(() => {
    getBalancesData();
  }, [getBalancesData]);

  useEffect(() => {
    getActivitiesData();
  }, [getActivitiesData]);

  useEffect(() => {
    getAlertsData();
  }, [getAlertsData]);

  useEffect(() => {
    getAccountsData();
  }, [getAccountsData]);

  return (
    <WalletView
      balancesLoading={balancesLoading}
      userBonusSummary={userBonusSummary}
      userBalanceSummary={userBalanceSummary}
      onFilter={handleFilter}
      onWithdraw={handleWithdraw}
      activitiesLoading={activitiesLoading}
      activitiesPage={activitiesPage}
      activitiesPageSize={activitiesPageSize}
      userBalancesTotal={userBalancesTotal}
      onUserBalancesPageChange={handleUserBalancesPageChange}
      onUserBalancesPageSizeChange={handleUserBalancesPageSizeChange}
      userBalances={userBalances}
      userWalletAddress={userWalletAddress}
      ethFee={ethFee}
      depositModalOpen={depositModalOpen}
      onDepositModalOpen={handleDepositModalOpen}
      onDepositModalClose={handleDepositModalClose}
      withdrawAllowed={withdrawAllowed}
      withdrawEmail={withdrawEmail}
      withdrawModalOpen={withdrawModalOpen}
      onWithdrawModalOpen={handleWithdrawModalOpen}
      onWithdrawModalClose={handleWithdrawModalClose}
      withdrawConfirmModalOpen={withdrawConfirmModalOpen}
      onWithdrawConfirmModalOpen={handleWithdrawConfirmModalOpen}
      onWithdrawConfirmModalClose={handleWithdrawConfirmModalClose}
      onResendWithdrawConfirmEmail={handleResendWithdrawConfirmEmail}
      withdrawConfirmEmailDelay={withdrawConfirmEmailDelay}
      totalDeposits={totalDeposits}
      totalWithdrawn={totalWithdrawn}
      totalRevenue={totalRevenue}
      totalPayments={totalPayments}
      totalProjectOwnerRevenue={totalProjectOwnerRevenue}
      totalLvl1Revenue={totalLvl1Revenue}
      totalLvl2Revenue={totalLvl2Revenue}
      totalLvl3Revenue={totalLvl3Revenue}
      alerts={alerts}
      accountsLoading={accountsLoading}
      accounts={accounts}
      accountId={accountId}
      onAccountIdChange={handleAccountIdChange}
    />
  );
};

export default WalletContainer;
