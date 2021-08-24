import { Container, Grid } from "@material-ui/core";
import React from "react";
import ProjectCard from "./ProjectCard";

function ProjectList({ projects, instituteId }) {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          {projects.map((project) => (
            <ProjectCard project={project} instituteId = {instituteId} key = {project.id}/>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProjectList;
