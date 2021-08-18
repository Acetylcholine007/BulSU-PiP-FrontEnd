import clsx from "clsx";
import { useState } from "react";
import { Box, makeStyles } from "@material-ui/core";

import AccountMenu from "../components/AccountMenu";
import MainAppBar from "../components/MainAppBar";
import MainDrawer from "../components/MainDrawer";

function MainWrapper({ children }) {
  const drawerWidth = 240;
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const useStyles = makeStyles((theme) => {
    return {
      root: {
        display: "flex",
        background: "#F9F9F9",
        width: "100%",
        height: "100%",
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
        padding: theme.spacing(3),
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
    };
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MainAppBar
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        setAnchorEl={setAnchorEl}
        setShowDialog={setShowDialog}
        drawerWidth={drawerWidth}
      />
      <AccountMenu
        showDialog={showDialog}
        anchorEl={anchorEl}
        setShowDialog={setShowDialog}
        setAnchorEl={setAnchorEl}
      />
      <MainDrawer
        drawerWidth={drawerWidth}
        open={open}
        handleDrawerClose={handleDrawerClose}
      />
      <div className={clsx(classes.content, { [classes.contentShift]: open })}>
        <div className={classes.drawerHeader} />
        <Box height="88vh" display="flex" flexDirection="column">
        {children}
        </Box>
      </div>
    </div>
  );
}

export default MainWrapper;
