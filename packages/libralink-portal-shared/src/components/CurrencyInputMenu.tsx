import { FC, useState, MouseEvent } from "react";
import { Box, Button, Divider, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

type Props = {
  value?: string;
  options: { label: string; value: string; disabled: boolean }[];
  onSelect: (value: string) => void;
};

const CurrencyInputMenu: FC<Props> = (props) => {
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
    <Box sx={{ mr: -2 }}>
      <Button
        sx={{
          py: 0.5,
          px: 1,
          minWidth: "auto",
          fontWeight: "inherit",
          fontSize: "inherit",
          lineHeight: "inherit",
          "& .MuiButton-endIcon": {
            ml: 0,
            color: "rgba(0, 0, 0, 0.54)",
          },
        }}
        id="currency-input-button"
        aria-controls={open ? "currency-input-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        color="inherit"
      >
        {props.value}
      </Button>
      <Menu
        sx={{ mt: 1.5 }}
        id="currency-input-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "currency-input-button",
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
    </Box>
  );
};

export default CurrencyInputMenu;
