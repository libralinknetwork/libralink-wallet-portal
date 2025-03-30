import { FC, useState, MouseEvent } from "react";
import { Box, Button, Divider, Menu, MenuItem } from "@mui/material";

import { ExpandIcon, UpIcon } from "../icons";

type Props = {
  value?: string;
  options: { label: string; value: string; disabled: boolean }[];
  onSelect: (value: string) => void;
};

const AccountsDropDownMenu: FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelect = (value: string) => {
    props.onSelect(value);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        sx={{
          py: 0.5,
          px: 2,
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "24px",
          "& .MuiButton-endIcon": {
            ml: 0,
            color: "neutrals.subtitle",
          },
        }}
        id="currency-button"
        aria-controls={open ? "currency-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={open ? <UpIcon /> : <ExpandIcon />}
        color="inherit"
      >
        {props.options.find(item => item.value === props.value)?.label || ''}
      </Button>
      <Menu
        sx={{ mt: 1 }}
        id="currency-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "currency-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {props.options.map((option, index) => (
          <Box key={option.value}>
            <MenuItem
              key={option.value}
              disabled={option.disabled}
              selected={option.value === props.value}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </MenuItem>
            {props.options.length > 1 && index === 0 && (
              <Divider sx={{ my: 0.5 }} />
            )}
          </Box>
        ))}
      </Menu>
    </>
  );
};

export default AccountsDropDownMenu;
