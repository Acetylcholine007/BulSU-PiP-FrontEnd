import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import NotificationList from "../components/NotificationList";

function ClientNotification({user}) {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <NotificationList notifications={user.notificationList} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ClientNotification;
