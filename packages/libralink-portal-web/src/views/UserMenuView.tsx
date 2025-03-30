import { FC, MouseEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ButtonBase,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

// @ts-ignore
import { UserIcon, LogoutIcon } from "libralink-portal-shared/icons";

type Props = {
  onLogout: () => void;
};

const UserMenuView: FC<Props> = (props) => {
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ButtonBase
        id="user-button"
        sx={{
          color: open ? "primary.main" : "neutrals.icons",
        }}
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <UserIcon />
      </ButtonBase>
      <Menu
        id="user-menu"
        sx={{
          ml: 18,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "user-button",
        }}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={props.onLogout}>
          <ListItemIcon sx={{ color: "neutrals.icons" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>{t("button.logout")}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenuView;
