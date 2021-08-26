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
import {
  AddCircleOutline,
  Cancel,
  CheckCircle,
  Edit,
  Save,
} from "@material-ui/icons";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import CommentModal from "../components/CommentModal";
import ViewerForm1 from "../components/ViewerForm1";
import ViewerForm2 from "../components/ViewerForm2";
import ViewerForm3 from "../components/ViewerForm3";
import EditorForm3 from "../components/EditorForm3";
import CreateCommentDialog from "../components/CreateCommentDialog";
import { serverUrl } from "../../../utils/serverUrl";
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

function ElevatedProjectViewer({ instituteId, project, institute, projectId, priority }) {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = useState(false);
  const [addCommentOpen, setAddCommentOpen] = useState(false);
  const [showForm3Editor, setShowForm3Editor] = useState(false);
  const [comment, setComment] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);

  const [proposedProjectCost, setProposedProjectCost] = useState(
    project.proposedProjectCost
  );
  const [investmentReq, setInvestmentReq] = useState(project.investmentReq);
  const [status, setStatus] = useState(project.status);
  const [form3Data, setForm3Data] = useState({
    recievedBy: project.recievedBy,
    recieverDesignation: project.recieverDesignation,
    dateRecieved: project.dateRecieved,
    pdoSignature: project.pdoSignature,
  });
  const [comments, setComments] = useState(project.commentList);

  const selectComment = (comment) => {
    setComment(comment);
    setOpen(true);
  };

  const handleSubmit = () => {
    var newInstitute = { ...institute };
    var projectIndex = newInstitute.projects.indexOf(project);
    newInstitute.projects[projectIndex] = {
      ...newInstitute.projects[projectIndex],
      investmentReq,
      status,
      commentList: comments,
      ...form3Data,
    };
    fetch(`${serverUrl}institutes/${institute.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newInstitute),
    }).then(() => {
      console.log("Successfully edited");
    });
  };

  const selectForm = (project) => {
    switch (tabIndex) {
      case 0:
        return (
          <ViewerForm1
            project={project}
            investmentReq={investmentReq}
            setInvestmentReq={setInvestmentReq}
            status={status}
          />
        );
      case 1:
        return (
          <ViewerForm2
            project={project}
            proposedProjectCost={proposedProjectCost}
            setProposedProjectCost={setProposedProjectCost}
            priority={priority}
          />
        );
      case 2:
        return showForm3Editor ? (
          <EditorForm3 form3Data={form3Data} setForm3Data={setForm3Data} />
        ) : (
          <ViewerForm3
            project={{ ...project, ...form3Data }}
            selectComment={selectComment}
          />
        );
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
      <Toolbar>
        <Typography variant="h4" className={classes.pageTitle}>
          {"Project Viewer"}
        </Typography>
        <Button
          variant="contained"
          startIcon={<CheckCircle />}
          onClick={() => {
            setStatus(3);
          }}
        >
          Approve
        </Button>
        <Button
          variant="contained"
          startIcon={<Edit />}
          onClick={() => {
            setStatus(2);
          }}
        >
          Revise
        </Button>
        <Button
          variant="contained"
          startIcon={<Cancel />}
          onClick={() => {
            setStatus(0);
          }}
        >
          Reject
        </Button>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => {
            handleSubmit();
            history.push(`/institutes/${instituteId}`);
          }}
        >
          Save Changes
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
                action={
                  (tabIndex === 2 && form3Data.dateRecieved === "") ||
                  (form3Data.dateRecieved !== "" && showForm3Editor) ? (
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setForm3Data({
                          ...form3Data,
                          dateRecieved: new Date().toISOString(),
                        });
                        setShowForm3Editor(!showForm3Editor);
                      }}
                    >
                      {showForm3Editor ? "Done" : "Edit"}
                    </Button>
                  ) : null
                }
              />
              <CardContent>{selectForm(project)}</CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Divider classes={{ root: classes.divider }} />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Comments"
                className={classes.cardHeader}
                action={
                  <Button
                    variant="outlined"
                    startIcon={<AddCircleOutline />}
                    onClick={() => {
                      setAddCommentOpen(true);
                    }}
                  >
                    ADD
                  </Button>
                }
              />
              <CardContent>
                <CommentList
                  comments={comments}
                  selectComment={selectComment}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {comment && (
          <CommentModal open={open} setOpen={setOpen} comment={comment} />
        )}
        <CreateCommentDialog
          open={addCommentOpen}
          setAddCommentOpen={setAddCommentOpen}
          comments={comments}
          setComments={setComments}
        />
      </Container>
    </React.Fragment>
  );
}

export default ElevatedProjectViewer;
