import { Theme } from "@mui/material";

const TableHead = (theme: Theme) => {
  return {
    MuiTableHead: {
      styleOverrides: {
        root: {},
      },
    },
  };
};

export default TableHead;
