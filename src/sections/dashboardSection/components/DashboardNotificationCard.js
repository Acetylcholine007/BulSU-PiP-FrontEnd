import { Card, Divider, Grid, Typography, makeStyles, Container } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import React from "react";



function DashboardNotificationCard({ notification }) {
  const useStyles = makeStyles({
    divider: {
      background: 'black',
    },
    header: {
      marginLeft: 5,
      fontWeight: "bold"
    },
    txt: {
      marginLeft: 5,
    }
  });

  const classes = useStyles();

  return (
      <Grid container style={{ marginTop: 10, marginBottom: 10 }}>
        <Grid item xs={1}>
          <Divider
            classes={{root: classes.divider}}
            orientation="vertical"
            variant="inset"
          />
        </Grid>
        <Grid item xs={11}>
          <Typography className={classes.header} variant="h5">
            {`${notification.header}`}
          </Typography>
          <Typography className={classes.txt} variant="h6">{`${notification.datetime}`}</Typography>
          <Typography className={classes.txt} variant="body2">{notification.message}</Typography>
        </Grid>
      </Grid>
  );
}

export default DashboardNotificationCard;
