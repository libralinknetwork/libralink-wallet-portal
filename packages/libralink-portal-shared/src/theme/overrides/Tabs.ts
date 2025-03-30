import { Theme } from "@mui/material";

const Tabs = (theme: Theme) => {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {},
        flexContainer: {
          gap: "48px",
        },
      },
    },
  };
};

export default Tabs;
