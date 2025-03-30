import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Chip } from "@mui/material";

import { UserBalanceStatus } from "api/balance-search";

const WalletActivitiesStatusView: FC<{
  value: UserBalanceStatus;
  note: string;
}> = ({ value, note }) => {
  const { t } = useTranslation();

  const getLabel = () => {
    const getNoteSign = (status: string) => {
      return !!note ? `${status} *` : status;
    };

    switch (value) {
      case "COMPLETED":
        return getNoteSign(t("status.done"));
      case "PENDING":
        return getNoteSign(t("status.pending"));
      case "CONFIRM":
        return getNoteSign(t("status.confirm"));
      case "PROCESSING":
        return getNoteSign(t("status.processing"));        
      default:
        return value;
    }
  };

  const getTitle = (): string => { 
    switch (note) {
      case 'label_non_sufficient_eth_funds':
        return t("user_balance_note.label_non_sufficient_eth_funds");
      default:
        return note;
    }
  }

  return (
    <Chip
      sx={(theme) => ({
        fontWeight: theme.typography.fontWeightBold,
        borderRadius: "4px",
        ...(value === "COMPLETED" && {
          border: `1px solid #20AF97`,
          color: "#20AF97",
        }),
        ...(value === "PENDING" && {
          border: `1px solid #F3A34B`,
          color: "#F3A34B",
        }),
        ...(value === "CONFIRM" && {
          border: `1px solid #3157BA`,
          color: "#3157BA",
        }),
      })}
      size="small"
      variant="outlined"
      label={getLabel()}
      title={getTitle()}
    />
  );
};

export default WalletActivitiesStatusView;
