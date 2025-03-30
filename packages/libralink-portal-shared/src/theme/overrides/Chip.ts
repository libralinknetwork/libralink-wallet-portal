import { Theme } from "@mui/material";

const Chip = (theme: Theme) => {
  return {
    MuiChip: {
      styleOverrides: {
        root: {
          ...theme.typography.body2,
          fontWeight: theme.typography.fontWeightMedium,
          paddingLeft: theme.spacing(1),
          paddingRight: theme.spacing(1),
        },
        icon: {
          marginLeft: theme.spacing(2),
          color: theme.palette.neutrals.icons,
        },
      },
    },
  };
};

export default Chip;
