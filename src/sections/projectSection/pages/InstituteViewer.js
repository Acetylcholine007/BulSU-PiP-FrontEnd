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
import React, { useContext, useEffect, useState } from "react";
import { Add, Save } from "@material-ui/icons";

import ProjectList from "../components/ProjectList";
import { AuthContext } from "../../../contexts/AuthContext";
import ProjectFilterDialog from "../components/ProjectFilterDialog";
import { serverUrl } from "../../../utils/serverUrl";
import SheetExport from "../../../shared/components/SheetExport";
import PDFExport from "../../../shared/components/PDFExport";

function InstituteViewer({ institute }) {
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [projects, setProject] = useState(institute.projectList);
  const [localPrio, setLocalPrio] = useState([...institute.priority]);

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
    divider: {
      marginBottom: 15,
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
        {/* <SheetExport
          institutes={[institute]}
          filename={institute.instituteId}
          buttonLabel="Export Investment Sheet"
        /> */}
        <PDFExport projects={institute.projects} filename={institute.instituteId} priority = {institute.priority}/>
        {!compareArray(institute.priority, localPrio) && (
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
                console.log("Priority Saved");
                switch (user.type) {
                  case 0:
                    history.push("/projects");
                    break;
                  case 1:
                    history.push(`/institutes/${institute.instituteId}`);
                    break;
                  case 2:
                    history.push(`/institutes/${institute.instituteId}`);
                    break;
                }
              });
            }}
          >
            Save Changes
          </Button>
        )}
      </Toolbar>
      <Divider classes={{ root: classes.divider }} />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <ProjectList
              instituteId={institute.instituteId}
              filter={filter}
              setFilter={setFilter}
              setOpen={setOpen}
              priority={institute.priority}
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
