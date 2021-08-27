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
import { AuthContext } from "../../../contexts/AuthContext";
import ProjectFilterDialog from "../components/ProjectFilterDialog";
import { serverUrl } from "../../../utils/serverUrl";

function InstituteViewer({ institute, instituteId, priority }) {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [projects, setProject] = useState(institute.projects);
  const [localPrio, setLocalPrio] = useState([...priority]);

  const [filter, setFilter] = useState({
    search: "",
    investmentReq: {
      enabled: false,
      value: [0, 100],
    },
    projectCost: {
      enabled: false,
      value: [0, 100],
    },
    status: {
      enabled: false,
      values: [false, false, false, false, false],
    },
  });

  const useStyles = makeStyles(() => ({
    pageTitle: {
      flexGrow: 10,
    },
    button: {
      marginLeft: 10,
    },
  }));

  const compareArray = (array1, array2) => {
    var result = true;
    array1.forEach((item, index) => {
      if (item != array2[index]) {
        result = false;
      }
    });
    return result;
  };

  const classes = useStyles();

  return (
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
        {!compareArray(priority, localPrio) && (
          <Button
            className={classes.button}
            variant="contained"
            startIcon={<Save />}
            onClick={() => {
              var newInstitute = { ...institute };
              newInstitute.priority = localPrio;
              fetch(`${serverUrl}institutes/${institute.id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(newInstitute),
              }).then(() => {
                console.log('Priority Saved')
                switch (user.type) {
                  case 0:
                    history.push("/projects");
                    break;
                  case 1:
                    history.push(`/institutes/${instituteId}`);
                    break;
                  case 2:
                    history.push(`/institutes/${instituteId}`);
                    break;
                }
              });
            }}
          >
            Save Changes
          </Button>
        )}
      </Toolbar>
      <Divider />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <ProjectList
              instituteId={instituteId}
              filter={filter}
              setFilter={setFilter}
              setOpen={setOpen}
              priority={priority}
              projects={projects}
              setProject={setProject}
              localPrio={localPrio}
              setLocalPrio={setLocalPrio}
            />
          </Grid>
        </Grid>
        <ProjectFilterDialog
          open={open}
          setOpen={setOpen}
          filter={filter}
          setFilter={setFilter}
        />
      </Container>
    </React.Fragment>
  );
}

export default InstituteViewer;
