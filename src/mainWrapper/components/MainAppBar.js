import {
  IconButton,
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  LinearProgress,
} from "@material-ui/core";
import clsx from "clsx";
import { useContext } from "react";
import MenuIcon from "@material-ui/icons/Menu";

import { AuthContext } from "../../contexts/AuthContext";
import { LoadingContext } from "../../contexts/LoadingContext";

function MainAppBar({
  open,
  handleDrawerOpen,
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
      },
    };
  });

  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const {isLoading} = useContext(LoadingContext);

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
          src={user.institute.profile_img.src}
        >
          <Typography variant="body1">{`${user.college}`}</Typography>
        </Avatar>
      </Toolbar>
          {isLoading && <LinearProgress />}
    </AppBar>
  );
}

export default MainAppBar;
