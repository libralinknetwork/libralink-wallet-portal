import { Theme } from "@mui/material";

import ButtonBase from "./ButtonBase";
import Button from "./Button";
import Toolbar from "./Toolbar";
import AppBar from "./AppBar";
import CssBaseline from "./CssBaseline";
import Paper from "./Paper";
import Rating from "./Rating";
import Chip from "./Chip";
import InputLabel from "./InputLabel";
import MenuItem from "./MenuItem";
import OutlinedInput from "./OutlinedInput";
import InputAdornment from "./InputAdornment";
import Tab from "./Tab";
import Tabs from "./Tabs";
import TabPanel from "./TabPanel";
import TableCell from "./TableCell";
import TableHead from "./TableHead";
import TablePagination from "./TablePagination";
import IconButton from "./IconButton";
import FormLabel from "./FormLabel";

const componentsOverrides = (theme: Theme) =>
  Object.assign(
    AppBar(theme),
    Button(theme),
    ButtonBase(theme),
    Chip(theme),
    CssBaseline(theme),
    FormLabel(theme),
    InputAdornment(theme),
    InputLabel(theme),
    MenuItem(theme),
    IconButton(theme),
    OutlinedInput(theme),
    Paper(theme),
    Rating(theme),
    Tab(theme),
    TableCell(theme),
    TableHead(theme),
    TablePagination(theme),
    TabPanel(theme),
    Tabs(theme),
    Toolbar(theme)
  );

export default componentsOverrides;
