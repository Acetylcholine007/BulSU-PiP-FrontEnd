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
  ButtonGroup,
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
import CommentList from "../components/CommentList";
import PDFExport from "../../../shared/components/PDFExport";
import { Admin, Projects } from "../../../utils/bulsupis_mw";

const useStyles = makeStyles((theme) => ({
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
  card: {
    marginBottom: 15,
  },
  cardHeader: {
    backgroundColor: theme.palette.tertiary.main,
  },
  pageTitle: {
    flexGrow: 11,
  },
  pageAction: {
    flexGrow: 1,
  },
  subDivider: {
    margin: "20px 0px 20px 0px",
  },
  button: {
    marginLeft: 10,
  },
  divider: {
    marginBottom: 15,
  },
}));

function ElevatedProjectViewer({ project, priority, instituteId }) {
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
  });
  const [newComments, setNewComments] = useState([]);
  const [PDOSignature, setPDOSignature] = useState([]);
  const [oldPDOSignature, setOldPDOSignature] = useState(
    project.pdoSignature ? [project.pdoSignature] : []
  );

  const [checkerForm1, setCheckerForm1] = useState({
      investmentReq: [
          { error: false, messages: [] },
          { error: false, messages: [] },
          { error: false, messages: [] },
          { error: false, messages: [] },
          { error: false, messages: [] },
      ],
  });
  const [checkerForm2, setCheckerForm2] = useState();
  const [checkerForm3, setCheckerForm3] = useState({
    recievedBy: {
      error: false,
      messages: [],
    },
    recieverDesignation: {
      error: false,
      messages: [],
    },
  });

  const selectComment = (comment) => {
    setComment(comment);
    setOpen(true);
  };

  const saveComments = async (comments) => {
    for(var i = 0; i < comments.length; i++) {
      await Projects.comment(project.id, comments[i].message)
    }
  }

  const handleSubmit = () => {
    Admin.Projects.edit(
      {
        ...project,
        proposedProjectCost,
        investmentReq,
        status,
        ...form3Data,
        pdoSignature: oldPDOSignature.length ? oldPDOSignature[0] : null,
      },
      PDOSignature
    )
      .then(() => {
        if(newComments.length) {
          saveComments(newComments)
          .then(() => {
            history.push(`/institutes/${instituteId}`);
          })
        } else {
          history.push(`/institutes/${instituteId}`);
        }
      })
      .catch((err) => console.log(err.message));
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
            checkerForm1={checkerForm1}
          />
        );
      case 1:
        return (
          <ViewerForm2
            project={project}
            proposedProjectCost={proposedProjectCost}
            setProposedProjectCost={setProposedProjectCost}
            priority={priority}
            checkerForm2={checkerForm2}
          />
        );
      case 2:
        return showForm3Editor ? (
          <EditorForm3
            form3Data={form3Data}
            setForm3Data={setForm3Data}
            PDOSignature={PDOSignature}
            setPDOSignature={setPDOSignature}
            oldPDOSignature={oldPDOSignature ? oldPDOSignature : []}
            setOldPDOSignature={setOldPDOSignature}
            checkerForm3={checkerForm3}
          />
        ) : (
          <ViewerForm3
            project={{
              ...project,
              ...form3Data,
              pdoSignature: oldPDOSignature[0],
            }}
            PDOSignature={PDOSignature}
          />
        );
      default:
        return null;
    }
  };

  const getTitle = () => {
    switch (tabIndex) {
      case 0:
        return "Investment Programming Entry";
      case 1:
        return "PAPs Form";
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
        <ButtonGroup className={classes.button}>
          <Button
            variant={status == 3 ? "contained" : "outlined"}
            startIcon={<CheckCircle />}
            onClick={() => {
              setStatus(3);
            }}
          >
            Approve
          </Button>
          <Button
            variant={status == 2 ? "contained" : "outlined"}
            startIcon={<Edit />}
            onClick={() => {
              setStatus(2);
            }}
          >
            Revise
          </Button>
          <Button
            variant={status == 0 ? "contained" : "outlined"}
            startIcon={<Cancel />}
            onClick={() => {
              setStatus(0);
            }}
          >
            Reject
          </Button>
        </ButtonGroup>
        <Button
          variant="contained"
          startIcon={<Save />}
          onClick={() => {
            handleSubmit();
          }}
          className={classes.button}
        >
          Save Changes
        </Button>
        <PDFExport
          projects={[project]}
          filename={project.title}
          priority={priority}
        />
      </Toolbar>
      <Divider classes={{ root: classes.divider }} />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Tabs
              value={tabIndex}
              onChange={(event, index) => {
                switch (tabIndex) {
                  case 0:
                    var checker = null;
                    if (true) {
                      setTabIndex(index);
                    }
                    //setCheckerForm1({});
                    break;
                  case 1:
                    var checker = null;
                    if (true) {
                      setTabIndex(index);
                    }
                    //setCheckerForm2({});
                    break;
                  case 2:
                    var checker = null;
                    if (true) {
                      setTabIndex(index);
                    }
                    //setCheckerForm3({});
                    break;
                }
              }}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Investment Programming Entry" />
              <Tab label="PAPs Form" />
              <Tab label="PDO Personnel Feedback" />
            </Tabs>
            <Card>
              <CardHeader
                title={getTitle()}
                className={classes.cardHeader}
                action={
                  tabIndex === 2 && project.dateRecieved === undefined ? (
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
            <Divider classes={{ root: classes.subDivider }} />
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
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
                  comments={project.commentList}
                  newComments={newComments}
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
          comments={newComments}
          setComments={setNewComments}
        />
      </Container>
    </React.Fragment>
  );
}

export default ElevatedProjectViewer;
