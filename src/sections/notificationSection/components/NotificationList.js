import { Grid } from "@material-ui/core";
import { useContext } from "react";
import NotificationCard from "./NotificationCard";

import { AuthContext } from "../../../contexts/AuthContext";

function NotificationList() {
  const {user: {notificationList}} = useContext(AuthContext);

  return (
    <Grid container spacing={1}>
      {notificationList.map((notification) => (
        <Grid item xs={12}>
          <NotificationCard notification={notification} />
        </Grid>
      ))}
    </Grid>
  );
}

export default NotificationList;
