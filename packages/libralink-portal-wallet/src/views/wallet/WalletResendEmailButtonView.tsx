import { FC, useCallback, useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Button, ButtonBase, Stack, Tooltip, Typography } from "@mui/material";
import differenceInSeconds from "date-fns/differenceInSeconds";
import fromUnixTime from "date-fns/fromUnixTime";

// @ts-ignore
import { InboxIcon } from "libralink-portal-shared/icons";

type Props = {
  variant: "text" | "icon";
  unixTime: number;
  onResend: () => void;
  delay: number;
};

const WalletResendEmailButtonView: FC<Props> = ({
  variant,
  unixTime,
  onResend,
  delay,
}) => {
  const { t } = useTranslation();

  const getTimeResend = useCallback(() => {
    return unixTime ? fromUnixTime(unixTime).getTime() : 0;
  }, [unixTime]);

  const [timeResend, setTimeResend] = useState<number>(getTimeResend());

  const getTimeLeft = useCallback(() => {
    return differenceInSeconds(timeResend + delay, Date.now());
  }, [timeResend, delay]);

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  const handleResend = () => {
    setTimeResend(Date.now());
    onResend();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    if (getTimeLeft() <= 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [getTimeLeft]);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
  }, [getTimeLeft]);

  useEffect(() => {
    setTimeResend(getTimeResend());
  }, [getTimeResend]);

  if (variant === "text") {
    return (
      <Stack width={1} spacing={0.5}>
        <Button
          sx={{
            color: "link.main",
            "&:disabled": {
              color: "link.main",
              opacity: 0.5,
            },
          }}
          size="small"
          variant="text"
          color="inherit"
          fullWidth
          onClick={handleResend}
          disabled={timeLeft > 0}
        >
          {t("button.resend_email")}
        </Button>

        {timeLeft > 0 && (
          <Typography variant="body2" color="neutrals.subtitle">
            <Trans
              t={t}
              i18nKey={"wallet.withdraw_confirm.info"}
              values={{ seconds: timeLeft }}
              components={{
                1: (
                  <Typography
                    display="inline-block"
                    width="22px"
                    component="span"
                    fontWeight="700"
                    color="link.main"
                  />
                ),
              }}
            />
          </Typography>
        )}
      </Stack>
    );
  }

  if (variant === "icon") {
    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Tooltip title={t("button.resend_email")} placement="top" arrow>
          <ButtonBase
            sx={{
              color: `link.main`,
              "&:hover": {
                color: `link.dark`,
              },
              "&:disabled": {
                opacity: 0.5,
              },
            }}
            onClick={handleResend}
            disabled={timeLeft > 0}
          >
            <InboxIcon />
          </ButtonBase>
        </Tooltip>

        {timeLeft > 0 && (
          <Typography
            width="26px"
            variant="body2"
            lineHeight="20px"
            noWrap
            color="basic.text"
          >
            {t("common.time_seconds", { seconds: timeLeft })}
          </Typography>
        )}
      </Stack>
    );
  }

  return null;
};

export default WalletResendEmailButtonView;
