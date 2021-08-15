import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import ProjectCard from "./ProjectCard";

function ProjectList({ projects }) {
  return (
    <Container>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="h3">List of Projects</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained">Save</Button>
        </Grid>
        <Grid item xs={12}>
          {projects.map((project) => (
            <ProjectCard project={project} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProjectList;
