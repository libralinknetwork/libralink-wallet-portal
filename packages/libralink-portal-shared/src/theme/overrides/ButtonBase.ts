import { Theme } from "@mui/material";

const ButtonBase = (theme: Theme) => {
  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {},
    },
  };
};

export default ButtonBase;
