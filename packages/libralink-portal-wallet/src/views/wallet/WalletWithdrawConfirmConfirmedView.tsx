import { FC } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";

type Props = {
  amount?: number;
  address?: string;
  onBackToWallet: () => void;
};

const WalletWithdrawConfirmConfirmedView: FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <Stack alignItems="center" p={16}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "400px",
          height: "400px",
        }}
      >
        <img
          src="/static/images/wallet/withdraw-confirmed.png"
          width="100%"
          height="100%"
          alt=""
        />
      </Box>

      <Typography fontSize="24px" lineHeight="32px" fontWeight={600} mt={1}>
        {t("wallet.withdraw_confirmed.title")}
      </Typography>
      <Typography
        fontSize="18px"
        lineHeight="24px"
        fontWeight={400}
        mt={4}
        mb={10}
        color="neutrals.subtitle"
      >
        <Trans
          t={t}
          i18nKey={"wallet.withdraw_confirmed.description"}
          values={{ value: props.amount, address: props.address }}
          components={{
            1: <span />,
          }}
        />
      </Typography>

      <Button
        sx={{ px: 16 }}
        size="small"
        variant="contained"
        onClick={props.onBackToWallet}
      >
        {t("button.back_to_my_wallet")}
      </Button>
    </Stack>
  );
};

export default WalletWithdrawConfirmConfirmedView;
