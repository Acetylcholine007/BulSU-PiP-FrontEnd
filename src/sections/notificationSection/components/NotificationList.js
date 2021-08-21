import { Grid } from "@material-ui/core";
import { useContext, useState } from "react";
import NotificationCard from "./NotificationCard";
import NotificationModal from "./NotificationModal";

import { AuthContext } from "../../../contexts/AuthContext";

function NotificationList() {
  const {user: {notificationList}} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const selectNotification = (notification) => {
    setNotification(notification);
    setOpen(true);
  }

  return (
    <div>
      <Grid container spacing={1}>
      {notificationList.map((notification) => (
        <Grid item xs={12} key = {notification.id}>
          <NotificationCard notification={notification} selectNotification = {selectNotification} />
        </Grid>
      ))}
    </Grid>
    {notification && (<NotificationModal open = {open} setOpen = {setOpen} notification = {notification} />)}
    </div>
  );
}

export default NotificationList;
