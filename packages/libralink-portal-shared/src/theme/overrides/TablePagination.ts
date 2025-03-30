import { Theme } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const TablePagination = (theme: Theme) => {
  return {
    MuiTablePagination: {
      defaultProps: {
        SelectProps: {
          IconComponent: KeyboardArrowDownIcon,
        },
      },
      styleOverrides: {
        root: {},
        spacer: {
          display: "none",
        },
        selectRoot: {
          background: "#FFFFFF",
          border: "1px solid #DEE0E3",
          borderRadius: "4px",
          minWidth: "56px",
        },
        select: {
          textAlign: "start",
          textAlignLast: "start",
        },
        selectLabel: {
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "20px",
          color: "#525B65",
        },
        selectIcon: {
          color: "#525B65",
          fontSize: "18px",
          right: "4px",
        },
        displayedRows: {
          marginLeft: "auto",
          fontSize: "14px",
          fontWeight: "400",
          lineHeight: "20px",
          color: "#525B65",
        },
      },
    },
  };
};

export default TablePagination;
