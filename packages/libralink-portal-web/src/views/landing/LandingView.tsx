import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";

import { routes } from "config/routes";

const LandingView = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flex: "auto",
        alignItems: "center",
        justifyContent: "space-around",
        gap: 20,
        p: 20,
      }}
    >
      <Box sx={{ width: "640px" }}>
        <Typography variant="h1">{t("landing.title")}</Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "neutrals.subtitle", mt: 6 }}
        >
          {t("landing.description")}
        </Typography>

        <Button
          size="large"
          variant="contained"
          component={RouterLink}
          to={routes.login}
          sx={{ mt: 12 }}
        >
          {t("button.start_working")}
        </Button>
      </Box>

      <Box sx={{ width: "560px" }}>
        <img src="/static/images/work.png" width="100%" height="100%" alt="" />
      </Box>
    </Box>
  );
};

export default LandingView;
