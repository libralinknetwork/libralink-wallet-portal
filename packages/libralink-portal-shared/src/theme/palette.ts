const PRIMARY = {
  light: "#A2DED4",
  main: "#20AF97",
  dark: "#1A8C79",
  darker: "#13695B",
  contrastText: "#fff",
};

const LINK = {
  main: "#3D6DE8",
  dark: "#3157BA",
  darker: "#25418B",
  contrastText: "#fff",
};

const WARNING = {
  main: "#F8C958",
  contrastText: "#fff",
};

const ERROR = {
  main: "#DF4C4E",
  dark: "#B33D3F",
  darker: "#872E2F",
  contrastText: "#fff",
};

const NEUTRALS = {
  background: "#F9FAFB",
  chips: "#EEEFF1",
  borders: "#DEE0E3",
  icons: "#BFC3C7",
  subtitle: "#525B65",
};

const BASIC = {
  white: "#FFFFFF",
  text: "#212B34",
};

const palette = {
  primary: { ...PRIMARY },
  link: { ...LINK },
  warning: { ...WARNING },
  error: { ...ERROR },
  neutrals: { ...NEUTRALS },
  basic: { ...BASIC },
  background: {
    default: NEUTRALS.background,
  },
  text: {
    primary: BASIC.text,
  },
};

export default palette;
