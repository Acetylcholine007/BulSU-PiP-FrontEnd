import { Card, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

function ProjectCard({ project }) {
  return (
    <Link
      underline="none"
      component={RouterLink}
      to={`/projects/${project.id}`}
    >
      <Card style={{ margin: 10 }}>
        <Grid container>
          <Grid item xs={1}></Grid>
          <Grid item xs={11}>
            <Typography variant="h4">{project.title}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Link>
  );
}

export default ProjectCard;
