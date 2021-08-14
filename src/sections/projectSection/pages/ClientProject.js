import { Button, Container, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React from "react";

import ProjectFilter from "../components/ProjectFilter";
import ProjectList from "../components/ProjectList";
import { serverUrl } from "../../../utils/serverUrl";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";

function ClientProject({ user }) {
  const history = useHistory();
  const {
    error,
    isPending,
    data: projects,
  } = useFetch(`${serverUrl}projects?ownerId=${user.id}`);

  console.log(projects);
  return (
    <React.Fragment>
      {error && <ErrorComponent message="Failed to fetch projects" />}
      {isPending && <LoadingComponent />}
      {projects && (
        <Container>
          <Grid container>
            <Grid item md={9} xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  history.push("/projects/new");
                }}
              >
                Create New
              </Button>
              <ProjectList projects={projects} />
            </Grid>
            <Grid item md={3} xs={12}>
              <ProjectFilter />
            </Grid>
          </Grid>
        </Container>
      )}
    </React.Fragment>
  );
}

export default ClientProject;
