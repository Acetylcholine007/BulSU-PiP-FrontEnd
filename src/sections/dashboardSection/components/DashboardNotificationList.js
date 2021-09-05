import { ButtonBase, makeStyles } from "@material-ui/core";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";

function DashboardNotificationList({ notifications, selectNotification }) {
  const useStyles = makeStyles(() => ({
    item: {
      border: "1px solid #D3D3D3",
      borderRadius: 5,
      margin: "10px 0px 10px 0px",
    },
  }));

  const classes = useStyles();

  return (
    <List dense>
      {notifications.map((notification) => (
        <div className={classes.item} key={notification.id}>
          <ButtonBase
            focusRipple
            key={notification.id}
            onClick={() => selectNotification(notification)}
          >
            <ListItem alignItems="flex-start" dense button>
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
          </ButtonBase>
        </div>
      ))}
    </List>
  );
}

export default DashboardNotificationList;
