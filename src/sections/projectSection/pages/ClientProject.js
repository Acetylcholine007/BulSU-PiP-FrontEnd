import { Button, Container, Grid, Typography } from "@material-ui/core";
import React from "react";
import ProjectFilter from "../components/ProjectFilter";
import ProjectList from "../components/ProjectList";

function ClientProject() {
  const getProjects = () => {
    return ["Project1", "Project2"];
  };
  return (
    <Container>
      <Grid container>
        <Grid item md={9} xs={12}>
          <Button variant="contained">Create New</Button>
          <ProjectList projects={getProjects()} />
        </Grid>
        <Grid item md={3} xs={12}>
          <ProjectFilter />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ClientProject;
