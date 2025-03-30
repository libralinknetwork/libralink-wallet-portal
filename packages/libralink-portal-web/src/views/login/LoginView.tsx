import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from "@mui/material";
import { LoginType } from "hooks/useLogin";

// @ts-ignore
import { GitHubIcon } from "libralink-portal-shared/icons";
// @ts-ignore
import { BitBucketIcon } from "libralink-portal-shared/icons";

type Props = {
  logining: boolean;
  loginType: LoginType | null;
  onLogin: (loginType: LoginType, remember: boolean) => void;
};

const LoginView: FC<Props> = (props) => {
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
        pl: 40,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", width: "440px" }}>
        <Typography variant="h2">{t("login.title")}</Typography>
        <Typography
          variant="subtitle1"
          sx={{ color: "neutrals.subtitle", mt: 2 }}
        >
          {t("login.subtitle")}
        </Typography>

        <Button
          size="large"
          variant="contained"
          startIcon={<GitHubIcon />}
          onClick={() => {
            props.onLogin("public", true);
          }}
          fullWidth
          sx={{ mt: 10 }}
          disabled={props.logining}
        >
          {t("button.sign_in_to_github")}
        </Button>
        <Button
          size="large"
          variant="outlined"
          color="inherit"
          startIcon={<BitBucketIcon />}
          fullWidth
          sx={{ mt: 6 }}
          disabled={true}
        >
          {t("button.sign_in_to_bitbucket")}
        </Button>
      </Box>

      <Box sx={{ width: "560px" }}>
        <img
          src="/static/images/welcome.png"
          width="100%"
          height="100%"
          alt=""
        />
      </Box>
    </Box>
  );
};

export default LoginView;
