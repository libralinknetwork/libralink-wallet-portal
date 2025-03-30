import { Theme } from "@mui/material";

const Paper = (theme: Theme) => {
  return {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: theme.palette.basic.white,
          borderRadius: "8px",
        },
        elevation1: {
          boxShadow: `1px 1px 8px ${theme.palette.neutrals.chips}`,
        },
      },
    },
  };
};

export default Paper;
