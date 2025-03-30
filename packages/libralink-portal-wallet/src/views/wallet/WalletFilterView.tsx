import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DatePicker } from "@mui/x-date-pickers";
import { Stack, TextField } from "@mui/material";
import { isValid } from "date-fns";

// @ts-ignore
import { CalendarIcon } from "libralink-portal-shared/icons";

type Props = {
  onFilter: (values: { fromDate?: Date; toDate?: Date }) => void;
};

const WalletFilterView: FC<Props> = (props) => {
  const { t } = useTranslation();

  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);

  const handleFromDateChange = (value: Date | null) => {
    setFromDate(value);
  };

  const handleToDateChange = (value: Date | null) => {
    setToDate(value);
  };

  const handleSearch = () => {
    if (fromDate && !toDate) {
      props.onFilter({
        fromDate: isValid(fromDate) ? fromDate : undefined,
        toDate: new Date(2099, 0),
      });
    } else if (!fromDate && toDate) {
      props.onFilter({
        fromDate: new Date(2023, 0),
        toDate: isValid(toDate) ? toDate : undefined,
      });
    } else {
      props.onFilter({
        fromDate: fromDate && isValid(fromDate) ? fromDate : undefined,
        toDate: toDate && isValid(toDate) ? toDate : undefined,
      });
    }
  };

  useEffect(() => {
    handleSearch();
  }, [fromDate, toDate]);

  return (
    <Stack direction="row" spacing={6}>
      <DatePicker
        value={fromDate}
        onChange={handleFromDateChange}
        components={{
          OpenPickerIcon: CalendarIcon,
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              svg: { color: "neutrals.icons" },
            }}
            inputProps={{
              ...params.inputProps,
              placeholder: t("placeholder.date_from") || "",
            }}
          />
        )}
      />
      <DatePicker
        value={toDate}
        onChange={handleToDateChange}
        components={{
          OpenPickerIcon: CalendarIcon,
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              svg: { color: "neutrals.icons" },
            }}
            inputProps={{
              ...params.inputProps,
              placeholder: t("placeholder.date_to") || "",
            }}
          />
        )}
      />
    </Stack>
  );
};

export default WalletFilterView;
