import { FC } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Box, Button, Stack, Typography } from "@mui/material";

// @ts-ignore
import { Modal } from "libralink-portal-shared/components";

type Props = {
  open: boolean;
  onClose: () => void;
  email: string;
};

const WalletWithdrawConfirmModalView: FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <Modal open={props.open} onClose={props.onClose} width={672}>
      <Stack width={1} alignItems="center" textAlign="center">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "224px",
            height: "224px",
          }}
        >
          <img
            src="/static/images/wallet/email-sent.png"
            width="100%"
            height="100%"
            alt=""
          />
        </Box>

        <Typography variant="h3" mb={2}>
          {t("wallet.withdraw_confirm.title")}
        </Typography>
        <Typography
          variant="body1"
          color="neutrals.subtitle"
          whiteSpace="pre-line"
          mb={10}
        >
          <Trans
            t={t}
            i18nKey={"wallet.withdraw_confirm.description"}
            values={{ email: props.email }}
            components={{
              1: (
                <Typography
                  component="span"
                  fontWeight="700"
                  color="basic.text"
                />
              ),
            }}
          />
        </Typography>

        <Stack width={1} spacing={2}>
          <Button
            size="small"
            variant="outlined"
            color="inherit"
            onClick={props.onClose}
            fullWidth
          >
            {t("button.got_it")}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default WalletWithdrawConfirmModalView;
