import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
  makeStyles,
  Button,
} from "@material-ui/core";
import { Block } from "@material-ui/icons";
import React from "react";

function DashboardNotificationList({ notifications, selectNotification }) {
  const useStyles = makeStyles(() => ({
    button: {
      textTransform: "none",
      marginBottom: 10
    },
  }));

  const classes = useStyles();

  return (
    <List dense>
      {notifications.length == 0 && (
        <Grid container align="center">
          <Grid item xs={12} align="center">
            <Block className={classes.icon} color="action" />
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5">No notifications to show</Typography>
          </Grid>
        </Grid>
      )}
      {notifications.length !== 0 &&
        notifications.map((notification) => (
          <Button
            className={classes.button}
            key={notification.id}
            onClick={() => selectNotification(notification)}
            variant="outlined"
          >
            <ListItem alignItems="flex-start" dense>
              <ListItemText
                primary={
                  <Typography variant="h6">{notification.header}</Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography variant="body1">
                      {new Date(notification.datetime).toDateString()}
                    </Typography>
                    <Divider />
                    <Typography variant="body2">
                      {notification.message}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </Button>
        ))}
    </List>
  );
}

export default DashboardNotificationList;
