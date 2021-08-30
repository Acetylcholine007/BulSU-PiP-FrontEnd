import clsx from "clsx";
import { useState } from "react";
import { Box, makeStyles } from "@material-ui/core";

import AccountMenu from "../components/AccountMenu";
import MainAppBar from "../components/MainAppBar";
import MainDrawer from "../components/MainDrawer";
import AccountEditorModal from "../components/AccountEditorModal";

function MainWrapper({ children }) {
  const drawerWidth = 240;
  const [openDrawer, setOpenDrawer] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
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
        open={openDrawer}
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
        setOpen={setOpenModal}
      />
      <MainDrawer
        drawerWidth={drawerWidth}
        open={openDrawer}
        handleDrawerClose={handleDrawerClose}
      />
      <div className={clsx(classes.content, { [classes.contentShift]: openDrawer })}>
        <div className={classes.drawerHeader} />
        <Box display="flex" flexDirection="column">
        {children}
        </Box>
      </div>
      <AccountEditorModal open = {openModal} setOpen = {setOpenModal}/>
    </div>
  );
}

export default MainWrapper;
