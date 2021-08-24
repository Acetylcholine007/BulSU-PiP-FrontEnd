import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  makeStyles,
  withStyles,
  useTheme,
  Container,
} from "@material-ui/core";
import React, { useContext } from "react";
import MuiListItem from "@material-ui/core/ListItem";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";

import { menuItems } from "../../utils/constants";
import { AuthContext } from "../../contexts/AuthContext";

function MainDrawer({ drawerWidth, open, handleDrawerClose }) {
  const useStyles = makeStyles((theme) => {
    return {
      root: {
        display: "flex",
        background: "#F9F9F9",
        width: "100%",
        height: "100%",
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
        backgroundImage: `url("images/drawerBackground.svg")`,
        backgroundSize: 'cover',
      },
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
        position: "fixed",
        bottom: 0,
        left: 170,
      },
      drawerSubHeader: {
        display: "block",
        alignItems: "center",
        backgroundColor: "#CDCECB",
        borderRadius: "0px 0px 15px 15px",
        padding: 15,
      },

      active: {
        background: "rgba(247,204,0,0.9)",
      },
      listItem: {
        borderRadius: "0px 20px 20px 0px",
      },
      listItemContent: {
        color: "white",
      },
    };
  });

  const ListItem = withStyles({
    root: {
      "&:hover": {
        backgroundColor: "rgba(247,204,0,0.3)",
        color: "white",
        "& .MuiListItemIcon-root": {
          color: "white",
        },
      },
    },
    selected: {},
  })(MuiListItem);

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const { user } = useContext(AuthContext);

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeft style={{ color: "white" }} />
          ) : (
            <ChevronRight style={{ color: "white" }} />
          )}
        </IconButton>
      </div>
      <Container className={classes.drawerSubHeader} align="center">
        <img
          src="/bsuLogo.png"
          style={{ objectFit: "fill", width: "90%" }}
          background-position="center"
          alt="BSU Logo"
        />
        <Typography variant="h5">BULACAN STATE UNIVERSITY</Typography>
      </Container>
      <List>
        <React.Fragment>
          {menuItems
            .filter((item) => item.for.includes(user.type))
            .map((item) => (
              <ListItem
                button
                key={item.text}
                onClick={() => history.push(item.path)}
                className={`${
                  location.pathname.includes(item.path) ? classes.active : ""
                } ${classes.listItem}`}
              >
                <ListItemIcon className={classes.listItemContent}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  classes={{ primary: classes.listItemContent }}
                />
              </ListItem>
            ))}
        </React.Fragment>
      </List>
    </Drawer>
  );
}

export default MainDrawer;
