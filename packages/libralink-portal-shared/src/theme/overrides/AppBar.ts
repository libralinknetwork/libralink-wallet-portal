import { Theme } from "@mui/material";

const AppBar = (theme: Theme) => {
  return {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.basic.white,
          boxShadow: "0px 1px 0px #DEE0E3;",
          borderRadius: 0,
        },
      },
    },
  };
};

export default AppBar;
