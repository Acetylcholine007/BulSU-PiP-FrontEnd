import { Fragment } from "react";
import {
  Button,
  IconButton,
  makeStyles,
  useTheme,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
} from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router";


function MainAppBar({
  open,
  handleDrawerOpen,
  user,
  setAnchorEl,
  setShowDialog,
  drawerWidth
}) {
  const useStyles = makeStyles((theme) => {
    return {
      root: {
        display: "flex",
        background: "#F9F9F9",
        width: "100%",
        height: "100%",
      },
      appBar: {
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: "none",
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
      },
      content: {
        flexGrow: 1,
        //padding: theme.spacing(3),
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        backgroundSize: "cover",
        backgroundRepeat: "repeat-x",
        backgroundPosition: "right top",
        backgroundAttachment: "scroll",
      },
      contentShift: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
      },
  
      active: {
        background: "rgba(3,169,244,0.6)",
      },
      title: {
        padding: theme.spacing(2),
        color: "white",
      },
      appTitle: {
        flexGrow: 1,
      },
      avatar: {
        marginLeft: theme.spacing(2),
        color: theme.palette.getContrastText(theme.palette.secondary.light),
        backgroundColor: theme.palette.secondary.light,
      },
      icon: {
        width: theme.spacing(4),
        height: theme.spacing(4),
      },
      cardHeader: {
        backgroundColor: theme.palette.primary.light,
      },
      locationSelector: {
        width: 150,
      },
      listItem: {
        color: "white",
      },
      dialogPaper: {
        borderRadius: "10px",
      },
      divider: {
        background: "rgba(255, 255, 255, 0.5)",
        margin: "0px 10px",
      },
    };
  });

  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
      elevation={1}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.appTitle} variant="h5" noWrap>
          BulSU PiP
        </Typography>
        {user != null ? (
          <Fragment>
            <Avatar
              className={classes.avatar}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
                setShowDialog(true);
              }}
            >
              {`${user.college}`}
            </Avatar>
          </Fragment>
        ) : (
          <Button
            color="secondary"
            variant="contained"
            onClick={() => history.push("/login")}
          >
            Log In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
