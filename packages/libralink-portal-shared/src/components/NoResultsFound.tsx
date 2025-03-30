import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";

import noResults from "assets/images/no-results.png";

type Props = {
  title: string;
  subtitle?: string;
};

const NoResultsFound: FC<Props> = ({ title, subtitle }) => {
  return (
    <Stack spacing={2} justifyContent="center" alignItems="center">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "320px",
        }}
      >
        <img src={noResults} width="100%" height="100%" alt="" />
      </Box>

      {title && (
        <Typography
          fontSize="18px"
          lineHeight="24px"
          fontWeight="600"
          color="basic.text"
        >
          {title}
        </Typography>
      )}

      {subtitle && (
        <Typography
          fontSize="14px"
          lineHeight="16px"
          fontWeight="400"
          color="neutrals.subtitle"
        >
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
};

export default NoResultsFound;
