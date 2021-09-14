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
  CheckCircleOutlined,
  CheckCircleOutlineOutlined,
  Description,
  Domain,
  Edit,
  Loop,
  NewReleases,
  Save,
  Settings,
} from "@material-ui/icons";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import CommentModal from "../components/CommentModal";
import ViewerForm1 from "../components/ViewerForm1";
import ViewerForm2 from "../components/ViewerForm2";
import ViewerForm3 from "../components/ViewerForm3";
import EditorForm3 from "../components/EditorForm3";
import CreateCommentDialog from "../components/CreateCommentDialog";
import CommentList from "../components/CommentList";
import PDFExport from "../../../shared/components/PDFExport";
import { Admin } from "../../../utils/bulsupis_mw";
import elForm3Validator from "../../../utils/elForm3Validator";
import AppBreadcrumb from "../../../shared/components/AppBreadcrumb";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { LoadingContext } from "../../../contexts/LoadingContext";
import { statuses } from "../../../utils/constants";

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
    background: "linear-gradient(45deg, #800000 30%, #FF8E53 110%)",
    color: "white",
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
  buttonGroup: {
    margin: "0px 0px 0px 10px",
  },
  divider: {
    marginBottom: 15,
  },
  cardHeaderAction: {
    margin: "auto",
  },
  controlToolbar: {
    padding: 16,
    color: "white",
    background: "linear-gradient(45deg, #800000 30%, #FF8E53 110%)",
    borderRadius: 5,
  },
  raised0: {
    backgroundColor: statuses[0].color,
    "&:hover": {
      backgroundColor: statuses[0].color,
    },
  },
  ...statuses
    .map((statusItem, index) => ({
      index: index,
      value: {
        backgroundColor: statusItem.color,
        "&:hover": {
          backgroundColor: statusItem.color,
        },
      },
    }))
    .reduce((a, v) => ({ ...a, [`raised${v.index}`]: v.value }), {}),
  ...statuses
    .map((statusItem, index) => ({
      index: index,
      value: {
        backgroundColor: theme.palette.grey[200],
        "&:hover": {
          backgroundColor: statusItem.color,
        },
      },
    }))
    .reduce((a, v) => ({ ...a, [`flat${v.index}`]: v.value }), {}),
}));

function ElevatedProjectViewer({ project, priority, instituteId }) {
  const classes = useStyles();
  const history = useHistory();
  const { setShowSnackbar, setSnackbarData } = useContext(SnackbarContext);
  const { setIsLoading } = useContext(LoadingContext);

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

  const handleSubmit = () => {
    setIsLoading(true);
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
      .then(({ simple, full }) => {
        if (simple) {
          setSnackbarData({
            type: 0,
            message: "Project action saved",
          });
          history.push(`/institutes/${instituteId}`);
        } else {
          setSnackbarData({
            type: 3,
            message: "Failed to save project action",
          });
        }
      })
      .catch((err) => {
        setSnackbarData({
          type: 3,
          message: err.message,
        });
        history.push(`/institutes/${instituteId}`);
      })
      .finally(() => {
        setIsLoading(false);
        setShowSnackbar(true);
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

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h4" className={classes.pageTitle}>
          {"Project Viewer"}
        </Typography>
        {tabIndex === 2 && project.dateRecieved === undefined && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setForm3Data({
                ...form3Data,
                dateRecieved: new Date().toISOString(),
              });
              setShowForm3Editor(!showForm3Editor);
            }}
            startIcon={showForm3Editor ? <CheckCircle /> : <Edit />}
            className={classes.button}
          >
            {showForm3Editor ? "Done" : "Edit"}
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          startIcon={<Save />}
          onClick={() => {
            switch (tabIndex) {
              case 2:
                let checker3 = elForm3Validator(form3Data);
                if (
                  !checker3.recievedBy.error &&
                  !checker3.recieverDesignation.error
                ) {
                  handleSubmit();
                } else {
                  setShowForm3Editor(true);
                }
                setCheckerForm3(checker3);
                break;
            }
          }}
          className={classes.button}
        >
          Save Changes
        </Button>
        <PDFExport
          projects={[project]}
          filename={project.title}
          institute={project.institute.institute}
        />
      </Toolbar>
      <AppBreadcrumb
        links={[
          {
            link: "/institutes",
            label: "Institutes",
            icon: <Domain fontSize="small" />,
          },
          {
            link: `/institutes/${instituteId}`,
            label: project.institute.institute,
            icon: <Settings fontSize="small" />,
          },
          {
            link: `/institutes/${instituteId}/${project.id}`,
            label: project.title,
            icon: <Description fontSize="small" />,
          },
        ]}
      />
      <Divider classes={{ root: classes.divider }} />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Tabs
              value={tabIndex}
              onChange={(event, index) => {
                switch (tabIndex) {
                  case 0:
                    setTabIndex(index);
                    break;
                  case 1:
                    setTabIndex(index);
                    break;
                  case 2:
                    let checker3 = elForm3Validator(form3Data);
                    console.log(form3Data);
                    console.log(checker3);
                    if (
                      !checker3.recievedBy.error &&
                      !checker3.recieverDesignation.error
                    ) {
                      setTabIndex(index);
                    } else {
                      setShowForm3Editor(true);
                    }
                    setCheckerForm3(checker3);
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
            {selectForm(project)}
          </Grid>
          <Grid item xs={12}>
            <Divider classes={{ root: classes.subDivider }} />
          </Grid>
          <Grid item xs={12}>
            <Toolbar className={classes.controlToolbar}>
              <Typography variant="h5" style={{ flexGrow: 1 }}>
                Project Actions
              </Typography>
              <ButtonGroup
                className={classes.buttonGroup}
                size="medium"
                variant="contained"
              >
                {statuses.map((statusItem, index) => (
                  <Button
                    variant={status == index ? "contained" : "text"}
                    startIcon={statusItem.icon}
                    onClick={() => {
                      setStatus(index);
                    }}
                    classes={{
                      contained: classes[`raised${statusItem.value}`],
                      text: classes[`flat${statusItem.value}`],
                    }}
                  >
                    {statusItem.label}
                  </Button>
                ))}
              </ButtonGroup>
            </Toolbar>
          </Grid>
          <Grid item xs={12}>
            <Divider classes={{ root: classes.subDivider }} />
          </Grid>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                title="Comments"
                className={classes.cardHeader}
                classes={{
                  action: classes.cardHeaderAction,
                }}
                action={
                  <Button
                    variant="contained"
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
          projectId={project.id}
        />
      </Container>
    </React.Fragment>
  );
}

export default ElevatedProjectViewer;
