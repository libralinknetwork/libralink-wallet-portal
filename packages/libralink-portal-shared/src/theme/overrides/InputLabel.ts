import { Theme } from "@mui/material";

const InputLabel = (theme: Theme) => {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
          fontWeight: theme.typography.fontWeightMedium,
          color: theme.palette.basic.text,
        },
      },
    },
  };
};

export default InputLabel;
