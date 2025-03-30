import { FC } from "react";
import { useTranslation } from "react-i18next";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Container,
  Paper,
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

// @ts-ignore
import { ExpandIcon } from "libralink-portal-shared/icons";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  padding: "0 24px",
  borderRadius: "4px",
  "&:before": {
    backgroundColor: "transparent",
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: 0,
  ".MuiAccordionSummary-content": {
    margin: "24px 0",
  },
  ".MuiAccordionSummary-expandIconWrapper": {
    color: "#010201",
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: "24px 0",
  borderTop: "1px solid rgba(0, 0, 0, 0.12)",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "none",
}));

type Props = {};

export const FaqView: FC<Props> = (props) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        backgroundColor: "basic.white",
      }}
    >
      <Box sx={{ height: "288px", backgroundColor: "neutrals.background" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-around"
          height="100%"
          spacing={2}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "288px",
            }}
          >
            <img
              src="/static/images/search.png"
              width="100%"
              height="100%"
              alt=""
            />
          </Box>
          <Stack justifyContent="center" alignItems="center">
            <Typography variant="h2">{t("faq.title")}</Typography>
            <Typography variant="subtitle1" color="neutrals.subtitle">
              {t("faq.subtitle")}
            </Typography>
          </Stack>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "288px",
            }}
          >
            <img
              src="/static/images/spyglass.png"
              width="100%"
              height="100%"
              alt=""
            />
          </Box>
        </Stack>
      </Box>
      <Container>
        <Stack mt={14} mb={13} spacing={4}>
          <StyledAccordion disableGutters variant="outlined">
            <StyledAccordionSummary expandIcon={<ExpandIcon color="inherit" />}>
              <Typography variant="body1" fontWeight="bold">
                {t("faq.question_1.title")}
              </Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <Typography variant="body1">
                {t("faq.question_1.description")}
              </Typography>
            </StyledAccordionDetails>
          </StyledAccordion>
          <StyledAccordion disableGutters variant="outlined">
            <StyledAccordionSummary expandIcon={<ExpandIcon color="inherit" />}>
              <Typography variant="body1" fontWeight="bold">
                {t("faq.question_2.title")}
              </Typography>
            </StyledAccordionSummary>
            <StyledAccordionDetails>
              <Typography variant="body1">
                {t("faq.question_2.description")}
              </Typography>
            </StyledAccordionDetails>
          </StyledAccordion>
        </Stack>
      </Container>
    </Box>
  );
};

export default FaqView;
