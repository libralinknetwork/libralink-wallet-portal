import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";
import { Box, ButtonBase, Divider, Drawer, List } from "@mui/material";

import {
  MyWalletIcon,
  MyAgentsIcon,
  // @ts-ignore
} from "libralink-portal-shared/icons";

// @ts-ignore
// import NotificationsPopover from "libralink-portal-notifications/Popover";

import { routes } from "config/routes";

import UserMenu from "containers/UserMenuContainer";

import LogoSmall from "components/LogoSmall";

import NavItem from "./NavItem";

const Sidebar = () => {
  const { t } = useTranslation();

  const items = [
    {
      href: routes.wallet,
      icon: <MyWalletIcon />,
      title: t("sidebar.my_wallet"),
      disabled: false,
    },
    {
      href: routes.agents,
      icon: <MyAgentsIcon />,
      title: t("sidebar.agents"),
      disabled: true,
    },    
  ];

  const content = (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          my: "40px",
        }}
      >
        <ButtonBase component={RouterLink} to={routes.index}>
          <LogoSmall />
        </ButtonBase>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          minHeight: "76px",
          overflowY: "auto",
        }}
      >
        <List component="nav">
          {items.map((item) => (
            <NavItem
              key={item.href}
              icon={item.icon}
              href={item.href}
              title={item.title}
              disabled={item.disabled}
            />
          ))}
        </List>
      </Box>

      <Divider />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          py: "42px",
          color: "neutrals.icons",
        }}
      >
        {/* <NotificationsPopover /> */}

        <UserMenu />
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      PaperProps={{
        sx: {
          width: "144px",
          border: "none",
          borderRadius: 0,
          boxShadow: "1px 1px 8px #EEEFF1",
        },
      }}
    >
      {content}
    </Drawer>
  );
};

export default Sidebar;
