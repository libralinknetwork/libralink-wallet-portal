import { Theme } from "@mui/material";

const TabPanel = (theme: Theme) => {
  return {
    MuiTabPanel: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
  };
};

export default TabPanel;
