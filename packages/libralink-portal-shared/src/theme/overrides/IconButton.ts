import { Theme } from "@mui/material";

const IconButton = (theme: Theme) => {
  return {
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: theme.spacing(1),
        },
      },
    },
  };
};

export default IconButton;
