import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu
} from "@material-ui/core";
import {
  Add as AddIcon,
  Settings as SettingsIcon,
  Person as AccountIcon,
} from "@material-ui/icons";
import classNames from "classnames";

// styles
import useStyles from "./styles";
import "./Header.css";

// components
import { Badge, Typography, Button } from "../Wrappers";

// context
import {
  useLayoutState,
  useLayoutDispatch,
} from "../../context/LayoutContext";
import { useUserDispatch, signOut } from "../../context/UserContext";

import { ThemeContext, themes } from "../../context/ThemeContext";

import DialogBox from "../DialogBox/DialogBox";
import NewWidget from "../NewWidget/NewWidget";

export default function Header(props) {
  var classes = useStyles();

  var userDispatch = useUserDispatch();

  // local
  var [settingsMenu, setSettingsMenu] = useState(false);
  var [isParameter, setIsParameter] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);

  let [open, setOpen] = useState(false);
  const DialogHandle = () => {
    setOpen((current) => !current);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" weight="medium" className={classes.logotype}>
          Dashboard
        </Typography>
        <div className={classes.grow} />
        {/*Add widget*/}
        <IconButton
          color="inherit"
          aria-haspopup="true"
          onClick={DialogHandle}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={null}
            color="secondary"
          >
            <AddIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        {/*Settings*/}
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="settings-menu"
          onClick={e => {
            setSettingsMenu(e.currentTarget);
            setIsParameter(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={null}
            color="secondary"
          >
            <SettingsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        {/*Profile*/}
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={e => setProfileMenu(e.currentTarget)}
        >
          <AccountIcon classes={{ root: classes.headerIcon }} />
        </IconButton>
        <Menu
          id="settings-menu"
          open={Boolean(settingsMenu)}
          anchorEl={settingsMenu}
          onClose={() => setSettingsMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              Parameters
            </Typography>
          </div>
          <li className="adjustments-line text-center color-change">
            <ThemeContext.Consumer>
              {({ changeTheme }) => (
                <>
                  <span className={classes.colorLabel}>LIGHT MODE</span>{" "}
                  <IconButton
                    color="inherit"
                    aria-haspopup="true"
                    aria-controls="settings-menu"
                    onClick={e => {
                      setSettingsMenu(e.currentTarget);
                      setIsParameter(false);
                    }}
                    className={classes.headerMenuButton}
                  >
                    <Badge
                      badgeContent={null}
                      color="secondary"
                    >
                      <SettingsIcon classes={{ root: classes.headerIconCollapse }} />
                    </Badge>
                  </IconButton>
                  <Badge
                    className="light-badge mr-2"
                    onClick={() => changeTheme(themes.light)}
                  />{" "}
                  <Badge
                    className="dark-badge ml-2"
                    onClick={() => changeTheme(themes.dark)}
                  />{" "}
                  <span className="color-label">DARK MODE</span>{" "}
                </>
              )}
            </ThemeContext.Consumer>
          </li>
        </Menu>
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              Mathias Ressort
            </Typography>
          </div>
          <div className={classes.profileMenuUser}>
            <Typography
              className={classes.profileMenuLink}
              color="primary"
              onClick={() => signOut(userDispatch, props.history)}
            >
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
      <div>
        {open && (
          <DialogBox open={open} OnDialogHandle={DialogHandle}>
            <NewWidget id={""} />
          </DialogBox>
        )}
      </div>
    </AppBar>
  );
}
