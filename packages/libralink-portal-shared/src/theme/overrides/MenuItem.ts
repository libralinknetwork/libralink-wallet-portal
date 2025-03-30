import { Theme } from "@mui/material";

const MenuItem = (theme: Theme) => {
  return {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: theme.palette.neutrals.subtitle,
        },
        selected: {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.neutrals.background,
        },
      },
    },
  };
};

export default MenuItem;
