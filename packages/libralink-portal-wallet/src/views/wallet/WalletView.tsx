import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button, Skeleton, Stack, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// @ts-ignore
import { currencyToUsd, formatCurrency } from "libralink-portal-shared/utils";
// @ts-ignore
import { DownloadIcon } from "libralink-portal-shared/icons";
// @ts-ignore
import { UploadIcon } from "libralink-portal-shared/icons";
// @ts-ignore
import { AccountsDropDownMenu } from "libralink-portal-shared/components";

import { UserBalance } from "api/balance-search";

import WalletBalanceView from "./WalletBalanceView";
import WalletFilterView from "./WalletFilterView";
import WalletStatementsView from "./WalletStatementsView";
import WalletActivitiesView from "./WalletActivitiesView";
import WalletWithdrawModalView from "./WalletWithdrawModalView";
import WalletDepositModalView from "./WalletDepositModalView";
import WalletWithdrawConfirmModalView from "./WalletWithdrawConfirmModalView";
import WalletAlertsView from "./WalletAlertsView";
import { Alert } from "../../api/wallet-alerts";
import { AccountNumber } from "../../api/accounts-get";

type Props = {
  balancesLoading: boolean;
  userBalanceSummary: number;
  userBonusSummary: number;
  activitiesLoading: boolean;
  activitiesPage: number;
  activitiesPageSize: number;
  userBalancesTotal: number;
  onUserBalancesPageChange: (page: number) => void;
  onUserBalancesPageSizeChange: (rows: number) => void;
  userBalances: UserBalance[];
  depositModalOpen: boolean;
  onDepositModalOpen: () => void;
  onDepositModalClose: () => void;
  withdrawAllowed: boolean;
  withdrawEmail: string;
  withdrawModalOpen: boolean;
  onWithdrawModalOpen: () => void;
  onWithdrawModalClose: () => void;
  withdrawConfirmModalOpen: boolean;
  onWithdrawConfirmModalOpen: () => void;
  onWithdrawConfirmModalClose: () => void;
  onResendWithdrawConfirmEmail: (balanceId: string) => void;
  withdrawConfirmEmailDelay: number;
  userWalletAddress: string;
  ethFee: number;
  onWithdraw: (values: {
    accountId: string;
    amount: number;
    amountUsd: number;
    address: string;
  }) => Promise<unknown>;
  onFilter: (values: { fromDate?: Date; toDate?: Date }) => void;
  totalDeposits: number;
  totalWithdrawn: number;
  totalPayments: number;
  totalRevenue: number;
  totalProjectOwnerRevenue: number;
  totalLvl1Revenue: number;
  totalLvl2Revenue: number;
  totalLvl3Revenue: number;
  alerts: Alert[];
  accountsLoading: boolean;
  accounts: AccountNumber[];
  accountId: string;
  onAccountIdChange: (accountId: string) => void;
};

export const WalletView: FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <WalletWithdrawModalView
        open={props.withdrawModalOpen}
        values={{ accountId: props.accountId }}
        onClose={props.onWithdrawModalClose}
        onSubmit={props.onWithdraw}
        ethRate={0}
        ethFee={props.ethFee}
        accounts={[]}
      />

      <WalletDepositModalView
        open={props.depositModalOpen}
        onClose={props.onDepositModalClose}
        userWalletAddress={props.userWalletAddress}
        ethFee={props.ethFee}
        ethRate={0}
        currency={props.accountId}
      />

      <WalletWithdrawConfirmModalView
        open={props.withdrawConfirmModalOpen}
        onClose={props.onWithdrawConfirmModalClose}
        email={props.withdrawEmail}
      />

      <Stack spacing={6} sx={{ p: 10 }}>
        <Stack direction="row" alignItems="center" spacing={4}>
          <Typography fontSize="24px" fontWeight="bold" lineHeight="32px">
            {t("wallet.title")}
          </Typography>
          {props.accountsLoading ? (
            <Skeleton variant="rounded" width={60} height={24} />
          ) : (
            <AccountsDropDownMenu
              value={props.accountId}
              options={props.accounts.map((account) => ({
                label: `${account.number} (${account.currency})`,
                value: account.id,
                disabled: false,
              }))}
              onSelect={(value: string) => {
                props.onAccountIdChange(value);
              }}
            />
          )}
        </Stack>

        <WalletAlertsView value={props.alerts} />

        <Stack spacing={8}>
          <Stack
            direction="row"
            spacing={6}
            justifyContent="space-between"
            alignItems="center"
          >
            <WalletFilterView onFilter={props.onFilter} />

            <Stack direction="row" spacing={6}>
              <Button
                sx={{ color: "neutrals.subtitle" }}
                size="small"
                variant="outlined"
                color="inherit"
                startIcon={<UploadIcon />}
                onClick={props.onWithdrawModalOpen}
                disabled={!props.withdrawAllowed}
              >
                {t("button.withdraw")}
              </Button>

              <Button
                sx={{ color: "neutrals.subtitle" }}
                size="small"
                variant="outlined"
                color="inherit"
                startIcon={<DownloadIcon />}
                onClick={props.onDepositModalOpen}
              >
                {t("button.deposit")}
              </Button>
            </Stack>
          </Stack>

          <WalletBalanceView
            loading={props.balancesLoading}
            currency={props.accountId}
            balanceEth={formatCurrency(props.userBalanceSummary)}
            balanceUsd={currencyToUsd(
              props.userBalanceSummary,
              0
            )}
            bonus={formatCurrency(props.userBonusSummary)}
            earned={formatCurrency(props.totalRevenue)}
            projectPassiveEarned={formatCurrency(
              props.totalProjectOwnerRevenue
            )}
          />

          <WalletStatementsView
            loading={props.balancesLoading}
            currency={props.accountId}
            totalDeposits={formatCurrency(props.totalDeposits)}
            totalPaid={formatCurrency(props.totalPayments)}
            totalWithdrawn={formatCurrency(props.totalWithdrawn)}
            totalLvl1Revenue={formatCurrency(props.totalLvl1Revenue)}
            totalLvl2Revenue={formatCurrency(props.totalLvl2Revenue)}
            totalLvl3Revenue={formatCurrency(props.totalLvl3Revenue)}
          />

          <WalletActivitiesView
            loading={props.balancesLoading || props.activitiesLoading}
            page={props.activitiesPage}
            count={props.userBalancesTotal}
            rowsPerPage={props.activitiesPageSize}
            onPageChange={props.onUserBalancesPageChange}
            onRowsPerPageChange={props.onUserBalancesPageSizeChange}
            userBalances={props.userBalances}
            ethRate={0}
            currencyRate={0}
            onResendWithdrawConfirmEmail={props.onResendWithdrawConfirmEmail}
            withdrawConfirmEmailDelay={props.withdrawConfirmEmailDelay}
          />
        </Stack>
      </Stack>
    </LocalizationProvider>
  );
};

export default WalletView;
