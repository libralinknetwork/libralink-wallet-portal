import { FC, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Grid from "@mui/material/Unstable_Grid2";
import { useFormik } from "formik";
import * as yup from "yup";

// @ts-ignore
import { currencyToUsd, formatCurrency } from "libralink-portal-shared/utils";

// @ts-ignore
import { InfoIcon, WarningIcon } from "libralink-portal-shared/icons";

// @ts-ignore
import { CurrencyInputMenu, Modal } from "libralink-portal-shared/components";

import { AccountNumber } from "api/accounts-get";

type Props = {
  open: boolean;
  values?: FormValues;
  onClose: () => void;
  onSubmit: (values: {
    accountId: string;
    amount: number;
    amountUsd: number;
    address: string;
  }) => Promise<unknown>;
  ethRate: number;
  ethFee: number;
  accounts: AccountNumber[];
};

type FormValues = {
  accountId?: string;
  amount?: number;
  toAddress?: string;
};

export const WalletWithdrawModalView: FC<Props> = (props) => {
  const { t } = useTranslation();

  const getInitialValues = (data?: FormValues) => {
    return {
      accountId: data?.accountId,
      amount: data?.amount,
      toAddress: data?.toAddress,
    };
  };

  const formik = useFormik<FormValues>({
    initialValues: getInitialValues(props.values),
    validationSchema: yup.object({
      toAddress: yup.string().required().label("Destination address"),
      amount: yup.number().min(0.03).required().label("Withdrawal amount"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      props
        .onSubmit({
          accountId: values.accountId as string,
          amount: values.amount as number,
          amountUsd: currencyToUsd(values.amount, currencyRate),
          address: values.toAddress as string,
        })
        .finally(() => {
          setSubmitting(false);
        });
    },
  });

  const selectedAccount = useMemo(
    () =>
      props.accounts.find(
        (value) => value.id === formik.values.accountId
      ),
    [props.accounts, formik.values.accountId]
  );

  const balance = useMemo(() => {
    // return selectedAccount?.balance || 0;
    return 0;
  }, [selectedAccount]);

  const currencyRate = useMemo(() => {
    // return selectedCurrency?.currency.currencyToUsdRate || 0;
    return 0;
  }, [selectedAccount]);

  const handleWithdrawAll = () => {
    formik.setFieldValue("amount", balance);
  };

  useEffect(() => {
    formik.setValues(getInitialValues(props.values));
  }, []);

  return (
    <Modal open={props.open} onClose={props.onClose} width={672}>
      <Typography fontSize="24px" fontWeight="700" lineHeight="36px">
        {t("wallet.withdraw.title", { currency: formik.values.accountId })}
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
          {t("wallet.withdraw.warning")}
        </Typography>
      </Stack>

      <Stack mt={4} direction="row" alignItems="center" spacing={2}>
        <Typography variant="body2" lineHeight="16px">
          {t("common.balance")}:{" "}
          {balance >= 0 ? (
            <span>
              <b>{formatCurrency(balance)}</b> / $
              {currencyToUsd(balance, currencyRate)}
            </span>
          ) : (
            <b>-</b>
          )}
        </Typography>

        <Button
          sx={{
            height: "32px",
            fontSize: "14px",
            lineHeight: "16px",
            fontWeight: 600,
            color: "link.main",
            px: 4,
          }}
          variant="text"
          color="inherit"
          size="small"
          onClick={handleWithdrawAll}
        >
          {t("button.withdraw_all")}
        </Button>
      </Stack>

      <Box mt={4}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={6}>
            <Grid xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="destination-address-input">
                  {t("label.destination_address")}
                </InputLabel>
                <OutlinedInput
                  id="destination-address-input"
                  name="toAddress"
                  value={formik.values.toAddress}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.toAddress && Boolean(formik.errors.toAddress)
                  }
                />
                {formik.touched.toAddress && formik.errors.toAddress && (
                  <FormHelperText error>
                    {formik.errors.toAddress}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>
            <Grid xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="withdrawal-amount-input">
                  {t("label.withdrawal_amount")}
                </InputLabel>
                <OutlinedInput
                  id="withdrawal-amount-input"
                  name="amount"
                  type="number"
                  value={formik.values.amount}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  error={formik.touched.amount && Boolean(formik.errors.amount)}
                  endAdornment={
                    <InputAdornment position="end" disableTypography>
                      <CurrencyInputMenu
                        value={formik.values.accountId}
                        options={props.accounts.map((account) => ({
                          label: `${account.number}`,
                          value: account.id,
                          disabled: false,
                        }))}
                        onSelect={(value: string) => {
                          formik.setFieldValue("currency", value);
                          formik.setFieldValue("amount", "");
                        }}
                      />
                    </InputAdornment>
                  }
                />
                {formik.touched.amount && formik.errors.amount && (
                  <FormHelperText error>{formik.errors.amount}</FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid xs={12}>
              <Stack spacing={2}>
                <Typography variant="body2" lineHeight="16px">
                  {t("common.fee")}:{" "}
                  {formik.values.amount ? (
                    <span>
                      <b>{`${formatCurrency(props.ethFee)} ETH`}</b>
                      {" / "}
                      {`$${currencyToUsd(props.ethFee, props.ethRate)}`}
                    </span>
                  ) : (
                    <b>-</b>
                  )}
                </Typography>
                <Typography variant="body2" lineHeight="16px">
                  {t("common.receiving")}:{" "}
                  {formik.values.amount ? (
                    <span>
                      <b>
                        {`${formatCurrency(formik.values.amount)} ${
                          formik.values.accountId
                        }`}
                      </b>
                      {" / "}
                      {`$${currencyToUsd(formik.values.amount, currencyRate)}`}
                    </span>
                  ) : (
                    <b>-</b>
                  )}
                </Typography>
              </Stack>

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
                  {t("wallet.withdraw.fee_info")}
                </Typography>
              </Stack>
            </Grid>

            <Grid xs={12}>
              <LoadingButton
                loading={formik.isSubmitting}
                size="small"
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                {t("button.withdraw")}
              </LoadingButton>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
};

export default WalletWithdrawModalView;
