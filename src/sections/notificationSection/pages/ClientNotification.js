import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import NotificationList from "../components/NotificationList";

function ClientNotification() {
  const getNotifications = () => {
    return [
        'notif1',
        'notif2'
    ];
  };
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <NotificationList notifications={getNotifications()} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ClientNotification;
