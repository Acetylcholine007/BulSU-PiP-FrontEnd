import { makeStyles } from "@material-ui/core";
import { Card, Typography } from "@material-ui/core";
import React from "react";

function GSPTab({ index }) {
  const useStyles = makeStyles(() => ({
    card: {
      padding: 20,
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <Typography variant="h6">{`Goal ${index + 1}`}</Typography>
    </Card>
  );
}

export default GSPTab;
