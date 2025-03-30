import { Theme } from "@mui/material";

const Button = (theme: Theme) => {
  return {
    MuiButton: {
      defaultProps: {
        disableRipple: true,
        disableElevation: true,
        size: "large",
      },
      styleOverrides: {
        root: {
          fontSize: "16px",
          textTransform: "none" as "none",
        },
        sizeSmall: {
          padding: "8px 24px",
        },
        sizeLarge: {
          padding: "16px 32px",
        },
        iconSizeSmall: {
          "& > *:first-child": {
            fontSize: "24px",
          },
        },
        iconSizeMedium: {
          "& > *:first-child": {
            fontSize: "24px",
          },
        },
        iconSizeLarge: {
          "& > *:first-child": {
            fontSize: "24px",
          },
        },
      },
    },
  };
};

export default Button;
