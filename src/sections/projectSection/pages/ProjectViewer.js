import { Container, Grid } from "@material-ui/core";
import React from "react";
import { useParams } from "react-router-dom";

import { serverUrl } from "../../../utils/serverUrl";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import CommentList from "../components/CommentList";

function ProjectViewer() {
  const { id } = useParams();
  const {
    error,
    isPending,
    data: project,
  } = useFetch(`${serverUrl}projects?id=${id}`);

  console.log(project);
  return (
    <React.Fragment>
      {error && <ErrorComponent message="Can't view project" />}
      {isPending && <LoadingComponent />}
      {project && <Container>
          <Grid container>
              <Grid item xs = {9}>
              {project[0].title}
              </Grid>
              <Grid item xs = {3}>
                  <CommentList comments = {project[0].commentList} />
              </Grid>
          </Grid>
      </Container>
      //CommentModal Here
      }
    </React.Fragment>
  );
}

export default ProjectViewer;
