import { FC, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import {
  Link,
  Pagination,
  PaginationItem,
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { format, isValid } from "date-fns";
import copy from "copy-to-clipboard";

// @ts-ignore
import { currencyToUsd, formatCurrency } from "libralink-portal-shared/utils";

// @ts-ignore
import { useSnackbar } from "libralink-portal-shared/lib/snackbar";

import { UserBalance, UserBalanceTxType } from "api/balance-search";

// @ts-ignore
import { ExternalLinkIcon, CopyIcon } from "libralink-portal-shared/icons";

import WalletActivitiesStatusView from "./WalletActivitiesStatusView";
import WalletResendEmailButtonView from "./WalletResendEmailButtonView";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  padding: "8px 18px",
}));

const StyledPaginationItem = styled(PaginationItem)(({ theme }) => ({
  margin: "0 4px",

  "&.Mui-selected": {
    backgroundColor: "#ffffff",
    border: "1px solid #20af97",
    borderRadius: "4px",
    padding: "4px",
    color: "#20af97",
    fontWeight: 600,

    "&:hover": {
      backgroundColor: "#ffffff",
    },
  },
}));

type Props = {
  loading: boolean;
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
  userBalances: UserBalance[];
  ethRate: number;
  currencyRate: number;
  onResendWithdrawConfirmEmail: (balanceId: string) => void;
  withdrawConfirmEmailDelay: number;
};

const WalletActivitiesView: FC<Props> = (props) => {
  const { t } = useTranslation();

  const snackbar = useSnackbar();

  const count = Math.ceil(props.count / props.rowsPerPage);

  const handleCopyHash = (hash: string) => {
    copy(hash);

    snackbar.success(t("wallet.hash_copied"));
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    props.onPageChange(newPage);
  };

  const handleRowsPerPageChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.onRowsPerPageChange(+event.target.value);
  };

  const getTxTypeLabel = (type: UserBalanceTxType) => {
    switch (type) {
      case "DEPOSIT":
        return t("tx_type.deposit");
      case "PAYMENT":
        return t("tx_type.payment");
      case "REFUND":
        return t("tx_type.refund");
      case "BONUS":
        return t("tx_type.bonus");
      case "BALANCE_TRANSFER":
        return t("tx_type.balance_transfer");
      case "REVENUE":
        return t("tx_type.revenue");
      case "WITHDRAWAL":
        return t("tx_type.withdrawal");
      case "LVL1_REVENUE":
        return t("tx_type.level_revenue", { level: 1 });
      case "LVL2_REVENUE":
        return t("tx_type.level_revenue", { level: 2 });
      case "LVL3_REVENUE":
        return t("tx_type.level_revenue", { level: 3 });
      case "LVL1_CONTRIB":
        return t("tx_type.level_contrib", { level: 1 });
      case "LVL2_CONTRIB":
        return t("tx_type.level_contrib", { level: 2 });
      case "LVL3_CONTRIB":
        return t("tx_type.level_contrib", { level: 3 });
      case "SYSTEM_ISSUE_REVENUE":
        return t("tx_type.system_issue_revenue");
      case "HEAD_ISSUE_REVENUE":
        return t("tx_type.head_issue_revenue");
      default:
        return type;
    }
  };

  return (
    <Stack spacing={4}>
      <Typography fontSize="18px" fontWeight="bold">
        {t("wallet.activities")}
      </Typography>

      <Paper sx={{ width: "100%", p: 4, pb: 0 }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="wallet activities table">
            <TableHead
              sx={{
                backgroundColor: "neutrals.background",
              }}
            >
              <TableRow>
                <TableCell sx={{ borderRadius: "4px 0 0 4px" }}>
                  <Typography
                    // @ts-ignore
                    variant="assistive"
                    textTransform="uppercase"
                    color="neutrals.subtitle"
                  >
                    {t("common.date")}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    // @ts-ignore
                    variant="assistive"
                    textTransform="uppercase"
                    color="neutrals.subtitle"
                  >
                    {t("common.amount")}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    // @ts-ignore
                    variant="assistive"
                    textTransform="uppercase"
                    color="neutrals.subtitle"
                  >
                    {t("common.fee")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    // @ts-ignore
                    variant="assistive"
                    textTransform="uppercase"
                    color="neutrals.subtitle"
                  >
                    {t("common.tx_type")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    // @ts-ignore
                    variant="assistive"
                    textTransform="uppercase"
                    color="neutrals.subtitle"
                  >
                    {t("common.status")}
                  </Typography>
                </TableCell>
                <TableCell width="264px">
                  <Typography
                    // @ts-ignore
                    variant="assistive"
                    textTransform="uppercase"
                    color="neutrals.subtitle"
                  >
                    {t("common.hash")}
                  </Typography>
                </TableCell>
                <TableCell sx={{ borderRadius: "0 4px 4px 0" }}>
                  <Typography
                    // @ts-ignore
                    variant="assistive"
                    textTransform="uppercase"
                    color="neutrals.subtitle"
                  >
                    {t("common.actions")}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {props.loading ? (
              <TableBody>
                {Array.from(new Array(props.rowsPerPage)).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton variant="rounded" height={20} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" height={20} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" height={20} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" height={20} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" height={20} />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" height={20} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                {props.userBalances.map((item, index) => (
                  <TableRow key={index} hover>
                    <StyledTableCell>
                      <Typography variant="body2" lineHeight="20px">
                        {isValid(new Date(item.createdAt))
                          ? format(
                              new Date(item.createdAt),
                              "MM/dd/yy HH:mm:ss"
                            )
                          : item.createdAt}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography variant="body2" lineHeight="20px">
                        {`${item.currency} ${formatCurrency(item.amount)}`}
                      </Typography>
                      <Typography variant="body2" lineHeight="20px">
                        ${currencyToUsd(item.amount, props.currencyRate)}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Typography variant="body2" lineHeight="20px">
                        {`ETH ${formatCurrency(item.fee)}`}
                      </Typography>
                      <Typography variant="body2" lineHeight="20px">
                        {`$${currencyToUsd(item.fee, props.ethRate)}`}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Typography
                        variant="body2"
                        lineHeight="20px"
                        color="neutrals.subtitle"
                      >
                        {getTxTypeLabel(item.txType)}
                      </Typography>
                    </StyledTableCell>
                    <StyledTableCell>
                      <WalletActivitiesStatusView
                        value={item.status}
                        note={item.note}
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      {(item.txType === "WITHDRAWAL" ||
                        item.txType === "DEPOSIT") &&
                        !!item.hash && (
                          <Stack
                            direction="row"
                            spacing={2}
                            alignItems="center"
                          >
                            <Typography
                              maxWidth="200px"
                              variant="body2"
                              lineHeight="20px"
                              noWrap
                              color="neutrals.subtitle"
                            >
                              {item.hash}
                            </Typography>
                            <Stack
                              sx={{
                                cursor: "pointer",
                                "&:hover": {
                                  color: `link.main`,
                                },
                              }}
                              color="neutrals.subtitle"
                              onClick={() => handleCopyHash(item.hash)}
                            >
                              <CopyIcon />
                            </Stack>
                            <Stack
                              sx={{
                                "&:hover": {
                                  color: `link.main`,
                                },
                              }}
                              component={Link}
                              target="_blank"
                              href={`https://etherscan.io/tx/${item.hash}`}
                              color="neutrals.subtitle"
                            >
                              <ExternalLinkIcon />
                            </Stack>
                          </Stack>
                        )}
                    </StyledTableCell>
                    <StyledTableCell>
                      {item.status === "CONFIRM" &&
                        item.confirmRequestCreatedAt && (
                          <WalletResendEmailButtonView
                            variant="icon"
                            unixTime={item.confirmRequestCreatedAt}
                            onResend={() =>
                              props.onResendWithdrawConfirmEmail(item.id)
                            }
                            delay={props.withdrawConfirmEmailDelay}
                          />
                        )}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>

        <TablePagination
          labelRowsPerPage={t("pagination.rows_per_page")}
          labelDisplayedRows={({ from, to, count }) => {
            return `${t("pagination.results")}: ${from}–${to} ${t(
              "pagination.of"
            )} ${count !== -1 ? count : `${t("pagination.more_than")} ${to}`}`;
          }}
          ActionsComponent={() => (
            <Pagination
              sx={{ ml: 5 }}
              count={count}
              page={props.page + 1}
              shape="rounded"
              size="small"
              renderItem={(item) => <StyledPaginationItem {...item} />}
              onChange={(event, page) => handlePageChange(event, page - 1)}
            />
          )}
          component="div"
          count={props.count}
          rowsPerPage={props.rowsPerPage}
          page={props.page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </Paper>
    </Stack>
  );
};

export default WalletActivitiesView;
