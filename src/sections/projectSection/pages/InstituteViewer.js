import {
  Button,
  Container,
  Divider,
  Grid,
  Toolbar,
  Typography,
  makeStyles,
  ButtonGroup,
  Breadcrumbs,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import { Add, Domain, Home, Save, Settings } from "@material-ui/icons";

import ProjectList from "../components/ProjectList";
import ProjectFilterDialog from "../components/ProjectFilterDialog";
import SheetExport from "../../../shared/components/SheetExport";
import PDFExport from "../../../shared/components/PDFExport";
import { Projects } from "../../../utils/bulsupis_mw";
import { institutes } from "../../../utils/constants";
import AppBreadcrumb from "../../../shared/components/AppBreadcrumb";

function InstituteViewer({ institute, user }) {
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
  const history = useHistory();

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
        <SheetExport
          institutes={[institute]}
          filename={
            institutes.find((item) => item.abbv === institute.abbv).institute
          }
          buttonLabel="Download Investment Sheet"
        />
        <PDFExport
          filename={
            institutes.find((item) => item.abbv === institute.abbv).institute
          }
          projects={institute.projectList}
          institute={
            institutes.find((item) => item.abbv === institute.abbv).institute
          }
        />
        <ButtonGroup orientation="vertical"></ButtonGroup>
        {!compareArray(institute.priority, localPrio) && user.type == 0 && (
          <Button
            className={classes.button}
            variant="contained"
            startIcon={<Save />}
            onClick={() => {
              Projects.rearrange(localPrio)
                .then((res) => {
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
                })
                .catch((err) => console.log(err.message));
            }}
          >
            Save Changes
          </Button>
        )}
      </Toolbar>
      {user.type !== 0 && (
        <AppBreadcrumb
          links={[
            {
              link: "/institutes",
              label: 'Institutes',
              icon: <Domain fontSize="small" />,
            },
            {
              link: `/institutes/${institute.id}`,
              label: institute.institute,
              icon: <Settings fontSize="small" />,
            },
          ]}
        />
      )}
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
