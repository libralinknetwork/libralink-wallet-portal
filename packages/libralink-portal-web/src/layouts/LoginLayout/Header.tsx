import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Button,
  Toolbar,
  Link,
  ButtonBase,
  Stack,
} from "@mui/material";

import { routes } from "config/routes";
import LogoSmall from "components/LogoSmall";

const linkStyle = {
  fontWeight: "fontWeightMedium",
  "&:hover": {
    color: "primary.main",
  },
};

const Header = () => {
  const { t } = useTranslation();

  return (
    <AppBar position="sticky">
      <Toolbar disableGutters sx={{ justifyContent: "space-between", px: 20 }}>
        <ButtonBase component={RouterLink} to={routes.index}>
          <LogoSmall />
        </ButtonBase>

        <Stack spacing={14} direction="row" alignItems="center">
          {/* <Link
            variant="button"
            color="text.primary"
            underline="none"
            component={RouterLink}
            to={routes.index}
            sx={linkStyle}
          >
            {t("header.jobs")}
          </Link>
          <Link
            variant="button"
            color="text.primary"
            underline="none"
            component={RouterLink}
            to={routes.index}
            sx={linkStyle}
          >
            {t("header.university")}
          </Link> */}
          <Link
            variant="button"
            color="text.primary"
            underline="none"
            component={RouterLink}
            to={routes.index}
            sx={linkStyle}
          >
            {t("header.blog")}
          </Link>
          <Link
            variant="button"
            color="text.primary"
            underline="none"
            component={RouterLink}
            to={routes.faq}
            sx={linkStyle}
          >
            {t("header.faq")}
          </Link>

          <Button
            size="small"
            variant="contained"
            component={RouterLink}
            to={routes.login}
          >
            {t("button.login")}
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
