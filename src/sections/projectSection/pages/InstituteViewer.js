import {
  Button,
  Container,
  Divider,
  Grid,
  Toolbar,
  Typography,
  makeStyles
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Add, Save } from "@material-ui/icons";

import ProjectFilter from "../components/ProjectFilter";
import ProjectList from "../components/ProjectList";
import { serverUrl } from "../../../utils/serverUrl";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { AuthContext } from "../../../contexts/AuthContext";

function InstituteViewer({instituteId}) {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState("");
  const {
    error,
    isPending,
    data: projects,
  } = useFetch(`${serverUrl}projects?institute.abbv=${instituteId}`);

  const useStyles = makeStyles(() => ({
    pageTitle: {
      flexGrow: 10
    },
    button: {
      margin: '0px 5px 0px 5px'
    }
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      {error && <ErrorComponent message="Failed to fetch projects" />}
      {isPending && <LoadingComponent />}
      {projects && (
        <React.Fragment>
          <Toolbar>
            <Typography variant="h4" className = {classes.pageTitle}>Project List</Typography>
            {user.type === 0 && <Button
              className = {classes.button}
              variant="contained"
              startIcon={<Add />}
              onClick={() => {
                history.push("/projects/new");
              }}
            >
              Create New
            </Button>}
            <Button 
              className = {classes.button} variant="contained" startIcon={<Save />}>Save Changes</Button>
          </Toolbar>
          <Divider />
          <Container>
            <Grid container>
              <Grid item md={9} xs={12}>
                <ProjectList projects={projects} instituteId = {instituteId}/>
              </Grid>
              <Grid item md={3} xs={12}>
                <ProjectFilter filter={filter} setFilter={setFilter} />
              </Grid>
            </Grid>
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default InstituteViewer;
