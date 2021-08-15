import { Button, Container, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useContext } from "react";

import ProjectFilter from "../components/ProjectFilter";
import ProjectList from "../components/ProjectList";
import { serverUrl } from "../../../utils/serverUrl";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { AuthContext } from "../../../contexts/AuthContext";

function ClientProject() {
  const history = useHistory();
  const {user} = useContext(AuthContext);
  const {
    error,
    isPending,
    data: projects,
  } = useFetch(`${serverUrl}projects?ownerId=${user.id}`);

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
