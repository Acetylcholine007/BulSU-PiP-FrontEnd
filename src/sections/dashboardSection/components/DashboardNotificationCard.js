import { Card, Divider, Grid, Typography } from "@material-ui/core";
import React from "react";

function DashboardNotificationCard({ notification }) {
  return (
    <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
      <Grid item xs={1}>
        <Divider orientation="vertical" variant="inset" />
      </Grid>
      <Grid item xs={11}>
      <Typography variant="h6">
          {`${notification.header} ${notification.datetime}`}
        </Typography>
        <Typography variant="body1">
          {notification.message}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default DashboardNotificationCard;
