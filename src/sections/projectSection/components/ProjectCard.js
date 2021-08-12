import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";

function ProjectCard({ project }) {
  return (
    <Card style={{ margin: 10 }}>
      <Grid container>
        <Grid item xs={1}></Grid>
        <Grid item xs={11}>
          <Typography variant="h4">{project}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default ProjectCard;
