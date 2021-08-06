import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Popover,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React from "react";

function AccountMenu({
  showDialog,
  anchorEl,
  setShowDialog,
  setAnchorEl,
  setUser,
  user
}) {
  const useStyles = makeStyles((theme) => {
    return {
      root: {
        display: "flex",
        background: "#F9F9F9",
        width: "100%",
        height: "100%",
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: "none",
      },
      drawerHeader: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-end",
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

  return (
    <Popover
      id="popover"
      open={showDialog}
      anchorEl={anchorEl}
      getContentAnchorEl={null}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      onClose={() => {
        setShowDialog(false);
        setAnchorEl(null);
      }}
      classes={{ paper: classes.dialogPaper }}
    >
      <Card style={{ minimumWidth: "250px" }}>
        <CardHeader
          avatar={<Avatar></Avatar>}
          title={
            <Typography variant="h6">{`${user.suc} ${user.college}`}</Typography>
          }
          subheader={user.email}
          className={classes.cardHeader}
        />
        <CardContent style={{ padding: "0px" }}>
          <List>
            <ListItem>
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  setUser(null);
                  setAnchorEl(null);
                }}
                className={classes.button}
                fullWidth
              >
                Log Out
              </Button>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </Popover>
  );
}

export default AccountMenu;
