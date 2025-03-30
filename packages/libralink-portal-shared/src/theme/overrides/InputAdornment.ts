import { Theme } from "@mui/material";

const InputAdornment = (theme: Theme) => {
  return {
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
          fontWeight: theme.typography.fontWeightRegular,
          color: theme.palette.neutrals.subtitle,
        },
      },
    },
  };
};

export default InputAdornment;
