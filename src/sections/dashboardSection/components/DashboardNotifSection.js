import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";

import DashboardNotificationCard from "./DashboardNotificationCard";

const useStyles = makeStyles({
  btn: {
      marginTop: 25

  },
  txt: {
    marginTop: 25
    
  }
})

function DashboardNotifSection({ notifications }) {
  const classes = useStyles()

  return (
    <Grid container spacing={1}>
      <Grid item xs={10}>
        <Typography className={classes.txt} variant="h3">Notifications</Typography>
      </Grid>
      <Grid item xs={2}>
        <Button className={classes.btn} variant="contained" color="primary">
          View All
        </Button>
      </Grid>
      <Grid item xs={12}>
        {notifications.map((notification) => (
          <DashboardNotificationCard notification={notification} />
        ))}
      </Grid>
    </Grid>
  );
}

export default DashboardNotifSection;
