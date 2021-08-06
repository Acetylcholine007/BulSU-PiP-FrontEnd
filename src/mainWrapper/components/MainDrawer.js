import {
  Drawer,
  Typography,
  IconButton,
  Card,
  Divider,
  List,
  ListItemIcon,
  ListItemText,
  makeStyles,
  withStyles,
  useTheme,
} from "@material-ui/core";
import MuiListItem from "@material-ui/core/ListItem";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router";
import { menuItems } from "../../utils/constants";

function MainDrawer({ drawerWidth, open, user, handleDrawerClose }) {
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
        backgroundColor: theme.palette.primary.light,
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
        //color: "white",
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
        //color: "white",
      },
      dialogPaper: {
        borderRadius: "10px",
      },
      divider: {
        //background: "rgba(255, 255, 255, 0.5)",
        margin: "0px 10px",
      },
    };
  });

  const ListItem = withStyles({
    // root: {
    //   "&:hover": {
    //     backgroundColor: "rgba(3,169,244,0.2)",
    //     color: "white",
    //     "& .MuiListItemIcon-root": {
    //       color: "white",
    //     },
    //   },
    // },
    selected: {},
  })(MuiListItem);

  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{ paper: classes.drawerPaper }}
    >
      <div className={classes.drawerHeader}>
        <Typography variant="h5" className={classes.title}>
          BulSU PiP
        </Typography>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeft style={{ color: "white" }} />
          ) : (
            <ChevronRight style={{ color: "white" }} />
          )}
        </IconButton>
      </div>

      <Card
        style={{
          backgroundColor: theme.palette.secondary.light,
          margin: "10px",
          padding: "10px",
        }}
      >
        <Typography
          variant="h6"
          align="center"
        >{`${user.suc} ${user.college}`}</Typography>
      </Card>
      <Divider classes={{ root: classes.divider }} />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => history.push(item.path)}
            className={location.pathname === item.path ? classes.active : null}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              classes={{ primary: classes.listItem }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default MainDrawer;
