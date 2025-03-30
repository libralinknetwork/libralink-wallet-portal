import { FC, ReactNode } from "react";
import {
  Link as RouterLink,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

type Props = {
  href: string;
  icon: ReactNode;
  title: string;
  disabled: boolean;
};

const NavItem: FC<Props> = ({ href, icon, title, disabled }) => {
  const resolvedPath = useResolvedPath(href);
  const match = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <ListItem key={title} disablePadding>
      <ListItemButton
        sx={(theme) => ({
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          items: "center",
          height: "80px",
          color: match
            ? theme.palette.primary.main
            : // @ts-ignore
              theme.palette.neutrals.subtitle,
          fontWeight: match
            ? theme.typography.fontWeightMedium
            : theme.typography.fontWeightRegular,
          fontSize: "14px",
          lineHeight: "16px",
          "&.Mui-selected": {
            // @ts-ignore
            backgroundColor: theme.palette.neutrals.background,
            borderLeft: `4px solid ${theme.palette.primary.main}`,
          },
        })}
        selected={!!match}
        component={RouterLink}
        to={href}
        disabled={disabled}
      >
        <ListItemIcon
          sx={(theme) => ({
            display: "flex",
            justifyContent: "center",
            color: match
              ? theme.palette.primary.main
              : // @ts-ignore
                theme.palette.neutrals.icons,
            svg: {
              fontSize: "24px",
            },
          })}
        >
          {icon}
        </ListItemIcon>
        <ListItemText sx={{ flex: "initial", mt: 2 }} disableTypography>
          {title}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default NavItem;
