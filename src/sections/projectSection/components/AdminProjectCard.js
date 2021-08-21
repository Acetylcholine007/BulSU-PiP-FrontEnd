import { Card, Grid, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";

function AdminProjectCard({ project }) {
  const useStyles = makeStyles(() => ({
    card: {
      margin: "10px 0px 10px 0px",
      padding: 10,
    },
  }));

  const classes = useStyles();
  const history = useHistory();
  
  return (
    <Card className={classes.card} onClick = {() => history.push(`/projects/${project.id}`)}>
      <Grid container>
        <Typography variant="h6">{project.title}</Typography>
      </Grid>
    </Card>
  );
}

export default AdminProjectCard;
