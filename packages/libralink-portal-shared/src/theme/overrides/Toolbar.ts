import { Theme } from "@mui/material";

const Toolbar = (theme: Theme) => {
  return {
    MuiToolbar: {
      styleOverrides: {
        root: {
          height: "72px",
        },
      },
    },
  };
};

export default Toolbar;
