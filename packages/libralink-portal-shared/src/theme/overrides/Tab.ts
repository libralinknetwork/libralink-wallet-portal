import { Theme } from "@mui/material";

const Tab = (theme: Theme) => {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "18px",
          padding: 0,
          textTransform: "capitalize",
        },
      },
    },
  };
};

export default Tab;
