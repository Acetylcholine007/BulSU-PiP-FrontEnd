import { Card, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  crd: {
      marginTop: 25
  }
})

function DashboardProjectCard({ title, count }) {
  const classes = useStyles()

  return (
    <Card className={classes.crd} variant="outlined">
      <Typography variant="h5">{title}</Typography>
      <Typography variant="h2">{count}</Typography>
    </Card>
  );
}

export default DashboardProjectCard;
