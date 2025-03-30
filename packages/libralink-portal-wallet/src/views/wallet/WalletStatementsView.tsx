import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Paper,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "none",
}));

type Props = {
  loading: boolean;
  currency: string;
  totalDeposits: number | string;
  totalPaid: number | string;
  totalWithdrawn: number | string;
  totalLvl1Revenue: number | string;
  totalLvl2Revenue: number | string;
  totalLvl3Revenue: number | string;
};

const WalletStatementsView: FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <Stack spacing={4}>
      <Typography fontSize="18px" fontWeight="bold">
        {t("wallet.statements")}
      </Typography>

      <TableContainer sx={{ padding: 4, paddingBottom: 2 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="wallet statements table">
          <TableHead
            sx={{
              backgroundColor: "neutrals.background",
            }}
          >
            <TableRow>
              <StyledTableCell sx={{ borderRadius: "4px 0 0 4px" }}>
                <Typography
                  // @ts-ignore
                  variant="assistive"
                  textTransform="uppercase"
                  color="neutrals.subtitle"
                >
                  {t("common.deposited")} ({props.currency})
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography
                  // @ts-ignore
                  variant="assistive"
                  textTransform="uppercase"
                  color="neutrals.subtitle"
                >
                  {t("common.withdrawn")} ({props.currency})
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography
                  // @ts-ignore
                  variant="assistive"
                  textTransform="uppercase"
                  color="neutrals.subtitle"
                >
                  {t("common.paid")} ({props.currency})
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography
                  // @ts-ignore
                  variant="assistive"
                  textTransform="uppercase"
                  color="neutrals.subtitle"
                >
                  {t("common.level_revenue", { level: 1 })} ({props.currency})
                </Typography>
              </StyledTableCell>
              <StyledTableCell>
                <Typography
                  // @ts-ignore
                  variant="assistive"
                  textTransform="uppercase"
                  color="neutrals.subtitle"
                >
                  {t("common.level_revenue", { level: 2 })} ({props.currency})
                </Typography>
              </StyledTableCell>
              <StyledTableCell sx={{ borderRadius: "0 4px 4px 0" }}>
                <Typography
                  // @ts-ignore
                  variant="assistive"
                  textTransform="uppercase"
                  color="neutrals.subtitle"
                >
                  {t("common.level_revenue", { level: 3 })} ({props.currency})
                </Typography>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {props.loading ? (
            <TableBody>
              <TableRow>
                <StyledTableCell>
                  <Skeleton variant="rounded" height={20} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton variant="rounded" height={20} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton variant="rounded" height={20} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton variant="rounded" height={20} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton variant="rounded" height={20} />
                </StyledTableCell>
                <StyledTableCell>
                  <Skeleton variant="rounded" height={20} />
                </StyledTableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <StyledTableCell>
                  <Typography variant="body2" lineHeight="20px">
                    {props.totalDeposits}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" lineHeight="20px">
                    {props.totalWithdrawn}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" lineHeight="20px">
                    {props.totalPaid}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" lineHeight="20px">
                    {props.totalLvl1Revenue}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" lineHeight="20px">
                    {props.totalLvl2Revenue}
                  </Typography>
                </StyledTableCell>
                <StyledTableCell>
                  <Typography variant="body2" lineHeight="20px">
                    {props.totalLvl3Revenue}
                  </Typography>
                </StyledTableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default WalletStatementsView;
