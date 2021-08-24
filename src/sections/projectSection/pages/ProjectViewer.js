import {
  Button,
  Container,
  Grid,
  Typography,
  Card,
  makeStyles,
  Divider,
  Tabs,
  CardHeader,
  Tab,
  CardContent,
  Toolbar,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { serverUrl } from "../../../utils/serverUrl";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import CommentModal from "../components/CommentModal";
import ViewerForm1 from "../components/ViewerForm1";
import ViewerForm2 from "../components/ViewerForm2";
import ViewerForm3 from "../components/ViewerForm3";
import { Delete, Edit } from "@material-ui/icons";
import CommentList from "../components/CommentList";

const useStyles = makeStyles({
  txt: {
    padding: "10px",
  },
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
  },
  cardHeader: {
    backgroundColor: "#d3d3d3",
  },
  pageTitle: {
    flexGrow: 11,
  },
  pageAction: {
    flexGrow: 1,
  },
  divider: {
    margin: "20px 0px 20px 0px",
  },
});

function ProjectViewer({ projectId }) {
  const classes = useStyles();
  const history = useHistory();
  const {
    error,
    isPending,
    data: project,
  } = useFetch(`${serverUrl}projects?id=${projectId}`);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const handleDelete = () => {
    fetch(`${serverUrl}projects/${projectId}`, {
      method: "DELETE"
    }).then(() => {
      history.push('/projects')
    });
  }

  const selectComment = (comment) => {
    setComment(comment);
    setOpen(true);
  };

  const selectForm = (project) => {
    switch (tabIndex) {
      case 0:
        return (
          <ViewerForm1
            project={project}
            investmentReq={null}
            setInvestmentReq={null}
            status={null}
          />
        );
      case 1:
        return (
          <ViewerForm2
            project={project}
            proposedProjectCost={null}
            setProposedProjectCost={null}
          />
        );
      case 2:
        return <ViewerForm3 project={project} />;
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (tabIndex) {
      case 0:
        return "Investment Program Form";
      case 1:
        return "Preparation Form";
      case 2:
        return "PDO Personnel Feedback";
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      {error && <ErrorComponent message="Can't view project" />}
      {isPending && <LoadingComponent />}
      {project && (
        <React.Fragment>
          <Toolbar>
            <Typography variant="h4" className={classes.pageTitle}>
              {"Project Viewer"}
            </Typography>
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={() => {
                history.push(`/projects/${projectId}/edit`);
              }}
            >
              Edit Project
            </Button>
            <Button
              variant="contained"
              startIcon={<Delete />}
              onClick={handleDelete}
            >
              Delete Project
            </Button>
          </Toolbar>
          <Divider />
          <Container>
            <Grid container>
              <Grid item xs={12}>
                <Tabs
                  value={tabIndex}
                  onChange={(event, index) => setTabIndex(index)}
                  indicatorColor="primary"
                  textColor="primary"
                  variant="fullWidth"
                >
                  <Tab label="Investment Program Form" />
                  <Tab label="Preparation Form" />
                  <Tab label="PDO Personnel Feedback" />
                </Tabs>
                <Card>
                  <CardHeader
                    title={getTitle()}
                    className={classes.cardHeader}
                  />
                  <CardContent>{selectForm(project[0])}</CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider classes={{ root: classes.divider }} />
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardHeader title="Comments" className={classes.cardHeader} />
                <CardContent>
                  <CommentList comments = {project[0].commentList} selectComment = {selectComment} />
                </CardContent>
              </Card>
            </Grid>

            {comment && (
              <CommentModal open={open} setOpen={setOpen} comment={comment} />
            )}
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default ProjectViewer;
