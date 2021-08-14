import {
  IconButton,
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
} from "@material-ui/core";
import clsx from "clsx";
import MenuIcon from "@material-ui/icons/Menu";

function MainAppBar({
  open,
  handleDrawerOpen,
  user,
  setAnchorEl,
  setShowDialog,
  drawerWidth,
}) {
  const useStyles = makeStyles((theme) => {
    return {
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

      appTitle: {
        flexGrow: 11,
      },
      appAccount: {
        flexGrow: 1,
      },
      avatar: {
        marginLeft: theme.spacing(2),
        color: theme.palette.getContrastText(theme.palette.secondary.light),
        backgroundColor: theme.palette.secondary.light
      },
    };
  });

  const classes = useStyles();

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
          BulSU Public Investment Program
        </Typography>
        <Avatar
          className={classes.avatar}
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
            setShowDialog(true);
          }}
          elevation={2}
        >
          <Typography variant="body1">{`${user.college}`}</Typography>
        </Avatar>
      </Toolbar>
    </AppBar>
  );
}

export default MainAppBar;
