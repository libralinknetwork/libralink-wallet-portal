import { Theme } from "@mui/material";

const TableCell = (theme: Theme) => {
  return {
    MuiTableCell: {
      styleOverrides: {
        root: {},
        head: {
          border: "none",
        },
      },
    },
  };
};

export default TableCell;
