import React, { useState, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import clsx from "clsx";
import {
  CssBaseline,
  AppBar,
  Badge,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";

import AlertsContext from "../../contexts/Alerts/AlertsContext";
import MenuList from "./listitems";
import { useStyles, theme } from "../index.style";
import UserMenu from "./usermenu";

import Eventos from "../Eventos";
import Usuarios from "../Usuarios";
import Conteudos from "../Conteudos";
import Noticias from "../Noticias";
import NovaNoticia from "../NovaNoticia";

function Main() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const { message, openAlert, handleClose } = useContext(AlertsContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h6"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              LINPE
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={0} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <UserMenu />
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List className={classes.menu}>
            <MenuList />
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="xl" className={classes.container}>
            <Switch>
              <Route exact path="/" component={Eventos} />
              <Route exact path="/conteudos" component={Conteudos} />
              <Route exact path="/noticias" component={Noticias} />
              <Route exact path="/usuarios" component={Usuarios} />
              <Route exact path="/novanoticia" component={NovaNoticia} />
            </Switch>
          </Container>
        </main>
        <Snackbar
          open={openAlert}
          autoHideDuration={6000}
          onClose={handleClose}
          message={message}
        />
      </div>
    </ThemeProvider>
  );
}

export default Main;
