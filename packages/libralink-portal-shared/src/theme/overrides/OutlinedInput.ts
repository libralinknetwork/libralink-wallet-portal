import { Theme } from "@mui/material";

const OutlinedInput = (theme: Theme) => {
  return {
    MuiOutlinedInput: {
      defaultProps: {
        size: "small",
      },
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
        },
        input: {
          height: "auto",
        },
        inputSizeSmall: {
          fontSize: "14px",
        },
      },
    },
  };
};

export default OutlinedInput;
