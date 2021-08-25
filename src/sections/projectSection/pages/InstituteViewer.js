import {
  Button,
  Container,
  Divider,
  Grid,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Add, GetApp, Save } from "@material-ui/icons";

import ProjectList from "../components/ProjectList";
import { serverUrl } from "../../../utils/serverUrl";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { AuthContext } from "../../../contexts/AuthContext";
import ProjectFilterDialog from "../components/ProjectFilterDialog";

function InstituteViewer({ instituteId }) {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState({
    search: '',
    investmentReq: {
      enabled: false,
      value: [0, 100]
    },
    projectCost: {
      enabled: false,
      value: [0, 100]
    },
    status: {
      enabled: false,
      values: [false, false, false, false, false]
    }
  });
  const {
    error,
    isPending,
    data: projects,
  } = useFetch(`${serverUrl}projects?institute.abbv=${instituteId}`);

  const useStyles = makeStyles(() => ({
    pageTitle: {
      flexGrow: 10,
    },
    button: {
      marginLeft: 10,
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      {error && <ErrorComponent message="Failed to fetch projects" />}
      {isPending && <LoadingComponent />}
      {projects && (
        <React.Fragment>
          <Toolbar>
            <Typography variant="h4" className={classes.pageTitle}>
              Project List
            </Typography>
            {user.type === 0 && (
              <Button
                className={classes.button}
                variant="contained"
                startIcon={<Add />}
                onClick={() => {
                  history.push("/projects/new");
                }}
              >
                Create New
              </Button>
            )}
            <Button
              className={classes.button}
              variant="contained"
              startIcon={<GetApp />}
            >
              Export Data
            </Button>
            <Button
              className={classes.button}
              variant="contained"
              startIcon={<Save />}
            >
              Save Changes
            </Button>
          </Toolbar>
          <Divider />
          <Container>
            <Grid container>
              <Grid item xs={12}>
                <ProjectList
                  projects={projects}
                  instituteId={instituteId}
                  filter={filter}
                  setFilter={setFilter}
                  setOpen={setOpen}
                />
              </Grid>
            </Grid>
            <ProjectFilterDialog open = {open} setOpen = {setOpen} filter = {filter} setFilter = {setFilter} />
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default InstituteViewer;
