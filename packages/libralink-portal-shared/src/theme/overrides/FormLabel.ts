import { Theme } from "@mui/material";

const FormLabel = (theme: Theme) => {
  return {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: theme.palette.basic.text,
        },
      },
    },
  };
};

export default FormLabel;
