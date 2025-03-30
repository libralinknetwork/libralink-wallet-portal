import { Theme } from "@mui/material";

const Rating = (theme: Theme) => {
  return {
    MuiRating: {
      defaultProps: {},
      styleOverrides: {
        root: {},
      },
    },
  };
};

export default Rating;
