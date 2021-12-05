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

// styles
import useStyles from "./styles";
import "./Header.css";

// components
import { Badge, Typography, Button } from "../Wrappers";

import { useUserDispatch, signOut } from "../../context/UserContext";

import { ThemeContext, themes } from "../../context/ThemeContext";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';

import { widgetConf, cookies } from "../Cards/ConfWidget";
import { reloadPage } from '../../pages/dashboard/Dashboard';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function writeJson(widgetId)
{
  cookies.set('widget' + widgetId, "true", { path: '/', sameSite: 'lax' });
  console.log(cookies.get('widget0'));
  console.log('Header');
  reloadPage();
}

export default function Header(props) {
  var classes = useStyles();

  var userDispatch = useUserDispatch();

  // local
  var [settingsMenu, setSettingsMenu] = useState(false);
  var [isParameter, setIsParameter] = useState(true);
  var [profileMenu, setProfileMenu] = useState(null);
  
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const placeItem = (widgetId) => {
    setOpen(false);
    writeJson(widgetId);
  };

  widgetConf.map((obj) =>
    (obj.id === 0) ? (cookies.get('widget0') === "true") ? obj.stateWidget = "true" : obj.stateWidget = "false" :
    (obj.id === 1) ? (cookies.get('widget1') === "true") ? obj.stateWidget = "true" : obj.stateWidget = "false" :
    (obj.id === 2) ? (cookies.get('widget2') === "true") ? obj.stateWidget = "true" : obj.stateWidget = "false" :
    (obj.id === 3) ? (cookies.get('widget3') === "true") ? obj.stateWidget = "true" : obj.stateWidget = "false" :
    (obj.id === 4) ? (cookies.get('widget4') === "true") ? obj.stateWidget = "true" : obj.stateWidget = "false" :
    (obj.id === 5) ? (cookies.get('widget5') === "true") ? obj.stateWidget = "true" : obj.stateWidget = "false" :
    (obj.id === 6) ? (cookies.get('widget6') === "true") ? obj.stateWidget = "true" : obj.stateWidget = "false" :
    (obj.id === 7) ? (cookies.get('widget7') === "true") ? obj.stateWidget = "true" : obj.stateWidget = "false" : null
  );
  console.log(widgetConf);

  return (
    <>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Add your Widget !"}</DialogTitle>
          <List sx={{ pt: 0 }}>
            {widgetConf.map((widgetObj, pos) => (
              <ListItem button onClick={() => placeItem(widgetObj.id)} key={pos}>
                {widgetObj.stateWidget === "true" ? null :
                <>
                  <ListItemAvatar>
                    <Avatar>
                      <AddIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={widgetObj.nameWidget} />
                </>}
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>

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
          onClick={handleClickOpen}
          className={classes.headerMenuButton}
        >
          <Badge
            badgeContent={null}
            color="secondary"
          >
            <AddIcon classes={{ root: classes.headerIcon }} />
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
    </AppBar>
    </>
    
  );
}
