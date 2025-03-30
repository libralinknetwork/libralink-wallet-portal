import { createTheme } from "@mui/material/styles";

import palette from "./palette";
import typography from "./typography";
import spacing from "./spacing";
import componentsOverride from "./overrides";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    assistive: true;
  }
}

declare module "@mui/material/styles" {
  interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    darker: string;
    contrastText: string;
  }
  interface Palette {
    primary: {
      light: string;
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    link: {
      main: string;
      dark: string;
      darker: string;
      contrastText: string;
    };
    neutrals: {
      background: string;
      chips: string;
      borders: string;
      icons: string;
      subtitle: string;
    };
    basic: {
      white: string;
      text: string;
    };
  }
}

const themeOptions = {
  palette,
  typography,
  spacing,
};

const theme = createTheme(themeOptions);
theme.components = componentsOverride(theme);

export default theme;
