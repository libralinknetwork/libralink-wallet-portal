import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Stack, Typography } from "@mui/material";
import copy from "copy-to-clipboard";

// @ts-ignore
import { useSnackbar } from "libralink-portal-shared/lib/snackbar";

// @ts-ignore
import { currencyToUsd, formatCurrency } from "libralink-portal-shared/utils";

// @ts-ignore
import { WarningIcon, InfoIcon } from "libralink-portal-shared/icons";
// @ts-ignore
import { CopyIcon } from "libralink-portal-shared/icons";

// @ts-ignore
import { Modal } from "libralink-portal-shared/components";

type Props = {
  open: boolean;
  onClose: () => void;
  userWalletAddress: string;
  ethRate: number;
  ethFee: number;
  currency: string;
};

export const WalletDepositModalView: FC<Props> = (props) => {
  const { t } = useTranslation();

  const snackbar = useSnackbar();

  const handleCopyWalletAddress = (walletAddress: string) => {
    copy(walletAddress);

    snackbar.success("Wallet address copied");
  };

  return (
    <Modal open={props.open} onClose={props.onClose} width={672}>
      <Typography fontSize="24px" fontWeight="700" lineHeight="36px">
        {t("wallet.deposit.title", { currency: props.currency })}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        mt={4}
        sx={{
          backgroundColor: "#FEF6ED",
          padding: "10px 16px",
          borderRadius: "8px",
        }}
      >
        <WarningIcon sx={{ color: "#F3A34B" }} />
        <Typography variant="body2" lineHeight="20px">
          {t("wallet.deposit.warning", { currency: props.currency })}
        </Typography>
      </Stack>

      <Stack spacing={2} mt={6}>
        <Typography variant="body2" lineHeight="16px">
          {t("common.wallet_address")}:
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={10}
          sx={{
            backgroundColor: "neutrals.background",
            padding: "16px",
            borderRadius: "4px",
            border: "1px solid #DEE0E3",
            color: "#212B34",
          }}
        >
          <Typography variant="body1" lineHeight="24px" noWrap>
            {props.userWalletAddress}
          </Typography>

          <Stack
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: `link.dark`,
              },
            }}
            color="link.main"
            onClick={() => handleCopyWalletAddress(props.userWalletAddress)}
          >
            <CopyIcon />
          </Stack>
        </Stack>
      </Stack>

      <Typography mt={4} variant="body2" lineHeight="16px">
        {t("common.fee_will_be_withheld")}:{" "}
        <b>{formatCurrency(props.ethFee)} ETH</b> / $
        {currencyToUsd(props.ethFee, props.ethRate)}
      </Typography>

      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        mt={2}
        sx={{
          backgroundColor: "#F5F8FE",
          padding: "10px 16px",
          borderRadius: "8px",
        }}
      >
        <InfoIcon sx={{ color: "#3D6DE8" }} />
        <Typography variant="body2" lineHeight="20px">
          {t("wallet.deposit.fee_info")}
        </Typography>
      </Stack>
    </Modal>
  );
};

export default WalletDepositModalView;
