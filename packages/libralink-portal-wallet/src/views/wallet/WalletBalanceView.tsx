import { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Paper, Skeleton, Stack, Typography } from "@mui/material";

const BalanceCard: FC<{
  loading: boolean;
  title: string;
  value: number | string;
  icon: ReactNode;
}> = ({ loading, title, value, icon }) => {
  return (
    <Paper sx={{ p: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack width={"calc(100% - 48px - 8px)"} spacing={2}>
          <Typography variant="body2" noWrap>
            {title}
          </Typography>
          <Typography fontSize="18px" fontWeight={700} noWrap>
            {loading ? (
              <Skeleton variant="rounded" width={100} height={24} />
            ) : (
              value
            )}
          </Typography>
        </Stack>
        <Box
          sx={(theme) => ({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "48px",
            width: "48px",
            borderRadius: "9999px",
          })}
        >
          {icon}
        </Box>
      </Stack>
    </Paper>
  );
};

type Props = {
  loading: boolean;
  currency: string;
  balanceEth: string | number;
  balanceUsd: string | number;
  bonus: string | number;
  earned: string | number;
  projectPassiveEarned: string | number;
};

const WalletBalanceView: FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <Grid container gap={4} wrap="nowrap">
      <Grid xs={3}>
        <BalanceCard
          loading={props.loading}
          title={`${t("common.balance")} (${props.currency})`}
          value={`${props.balanceEth} ($${props.balanceUsd}) `}
          icon={
            <img
              src="/static/images/wallet/balance.png"
              width="100%"
              height="100%"
              alt=""
            />
          }
        />
      </Grid>
      <Grid xs={3}>
        <BalanceCard
          loading={props.loading}
          title={`${t("common.bonus")} (${props.currency})`}
          value={props.bonus}
          icon={
            <img
              src="/static/images/wallet/paid.png"
              width="100%"
              height="100%"
              alt=""
            />
          }
        />
      </Grid>
      <Grid xs={3}>
        <BalanceCard
          loading={props.loading}
          title={`${t("common.earned")} (${props.currency})`}
          value={props.earned}
          icon={
            <img
              src="/static/images/wallet/earned.png"
              width="100%"
              height="100%"
              alt=""
            />
          }
        />
      </Grid>
      <Grid xs={3}>
        <BalanceCard
          loading={props.loading}
          title={`${t("common.earned")} (${t("common.referral")}, ${
            props.currency
          })`}
          value={props.projectPassiveEarned}
          icon={
            <img
              src="/static/images/wallet/earned-project-passive.png"
              width="100%"
              height="100%"
              alt=""
            />
          }
        />
      </Grid>
    </Grid>
  );
};

export default WalletBalanceView;
