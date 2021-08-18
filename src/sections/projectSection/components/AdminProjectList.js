import { Container, Grid, Typography } from "@material-ui/core";
import React from "react";

import AdminProjectCard from "./AdminProjectCard";

function AdminProjectList({ projects }) {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4">Projects</Typography>
        </Grid>
        <Grid item xs={12}>
          {projects.map((project) => (
            <AdminProjectCard project={project} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminProjectList;
