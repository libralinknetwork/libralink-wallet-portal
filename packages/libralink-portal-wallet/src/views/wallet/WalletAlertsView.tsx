import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, IconButton, Stack, Typography } from "@mui/material";

// @ts-ignore
import { WarningIcon, RightIcon } from "libralink-portal-shared/icons";

import { AlertCode } from "api/wallet-alerts";

type Props = {
  value: { code: AlertCode; value1: string; value2: string }[];
};

const WalletAlertsView: FC<Props> = ({ value }) => {
  const { t } = useTranslation();

  const [activeStep, setActiveStep] = useState(1);
  const maxSteps = !!value ? value.length : 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep < maxSteps ? prevActiveStep + 1 : 1
    );
  };

  const message = useMemo(() => {
    if (!!value && value.length > 0) {
      const item = value[activeStep - 1];

      switch (item.code) {
        case "ALERT_GAS_PRICE_TOO_HIGH":
          return t("alert_code.alert_gas_price_too_high", {
            value1: item.value1,
            value2: item.value2,
          });
        default:
          return item.code;
      }
    } else {
      return null;
    }
  }, [t, value, activeStep]);

  if (maxSteps === 0) {
    return null;
  }

  return (
    <Box width={1}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          backgroundColor: "#FEF6ED",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <WarningIcon sx={{ color: "#F3A34B" }} />
          <Typography variant="body2" lineHeight="20px">
            {message}
          </Typography>
        </Stack>

        {maxSteps > 1 && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography
              variant="body2"
              lineHeight="16px"
              color="neutrals.subtitle"
            >
              {activeStep}/{maxSteps}
            </Typography>

            <IconButton
              sx={{ color: "neutrals.subtitle", p: 0 }}
              onClick={handleNext}
              size="small"
              color="inherit"
            >
              <RightIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default WalletAlertsView;
