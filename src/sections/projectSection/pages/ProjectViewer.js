import { Button, Container, Grid, Typography, Card } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

import { serverUrl } from "../../../utils/serverUrl";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import CommentList from "../components/CommentList";
import CommentModal from "../components/CommentModal";

function ProjectViewer() {
  const history = useHistory();
  const { id } = useParams();
  const {
    error,
    isPending,
    data: project,
  } = useFetch(`${serverUrl}projects?id=${id}`);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(null);

  const selectComment = (comment) => {
    setComment(comment);
    setOpen(true);
  }

  return (
    <React.Fragment>
      {error && <ErrorComponent message="Can't view project" />}
      {isPending && <LoadingComponent />}
      {
        project && (
          <Container>
            <Grid container>
              <Grid item xs={9}>
                <Grid container>
                  <Grid item xs={12}>
                    <Card style = {{backgroundColor: 'grey', padding: 10}}>
                      <Grid container>
                        <Grid item xs={10}>
                          <Typography variant="h3">
                            {project[0].title}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            variant="outlined"
                            onClick={() => {
                              history.push(`/projects/${id}/edit`);
                            }}
                          >
                            Edit
                          </Button>
                        </Grid>
                      </Grid>
                    </Card>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">GSP:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">
                      {project[0].obligationType}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Proponent:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">{project[0].proponent}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Investment Request:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">
                      {project[0].investmentReq}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Implementation Period:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">
                      {project[0].implementationPeriod}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">PAP Level:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">{project[0].PAPLevel}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Readiness:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">{project[0].readiness}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Status:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">{project[0].status}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Remarks:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">{project[0].remarks}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Address:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">{project[0].address}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Project Location:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">
                      {project[0].projectLocation}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Categorization:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">
                      {project[0].categorization}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Description:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">
                      {project[0].description}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Purpose:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">{project[0].purpose}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Beneficiary:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">
                      {project[0].beneficiary}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Proponent Name:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">
                      {project[0].proponentName}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Designation:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">
                      {project[0].designation}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Contact Information:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">
                      {project[0].contactInformation}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="h4">Date Accomplished:</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography variant="h4">
                      {project[0].dateAccomplished}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <CommentList comments={project[0].commentList} selectComment = {selectComment}/>
              </Grid>
            </Grid>
            
            <CommentModal open = {open} setOpen = {setOpen} comment = {comment} />
          </Container>
        )
      }
    </React.Fragment>
  );
}

export default ProjectViewer;
