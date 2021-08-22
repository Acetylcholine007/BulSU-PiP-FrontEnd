import { Container, Grid } from "@material-ui/core";
import React from "react";
import ProjectCard from "./ProjectCard";

function ProjectList({ projects }) {
  return (
    <Container>
      <Grid container>
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
