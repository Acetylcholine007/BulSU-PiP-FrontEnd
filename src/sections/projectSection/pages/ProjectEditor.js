import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  Typography,
  makeStyles,
  Toolbar,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import EditorForm1 from "../components/EditorForm1";
import EditorForm2 from "../components/EditorForm2";
import { AuthContext } from "../../../contexts/AuthContext";
import { institutes } from "../../../utils/constants";
import { form1Validator } from "../../../utils/form1Validator";
import form2Validator from "../../../utils/form2Validator";
import { Projects } from "../../../utils/bulsupis_mw";
import AppBreadcrumb from "../../../shared/components/AppBreadcrumb";
import { AddCircle, Description, Edit, LibraryBooks } from "@material-ui/icons";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import { LoadingContext } from "../../../contexts/LoadingContext";

function ProjectEditor({ isNew, project }) {
  const { setShowSnackbar, setSnackbarData } = useContext(SnackbarContext);
  const { setIsLoading } = useContext(LoadingContext);
  const [page, setPage] = useState(1);
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const useStyles = makeStyles((theme) => ({
    cardHeader: {
      background: "linear-gradient(45deg, #800000 30%, #FF8E53 110%)",
      color: "white",
    },
    divider: {
      marginBottom: 15,
    },
    card: {
      marginBottom: 15,
    },
    button: {
      marginLeft: 10,
    },
    cardHeaderAction: {
      margin: "auto",
    },
  }));

  const classes = useStyles();
  const currentDate = new Date();

  const [form1Data, setForm1Data] = useState(
    isNew
      ? {
          title: "",
          GSP: [null, null, null, null, null],
          obligationType: "",
          proponent: "",
          investmentReq: [
            { year: currentDate.getFullYear().toString(), value: 0 },
            { year: (currentDate.getFullYear() + 1).toString(), value: 0 },
            { year: (currentDate.getFullYear() + 2).toString(), value: 0 },
            { year: (currentDate.getFullYear() + 3).toString(), value: 0 },
            { year: (currentDate.getFullYear() + 4).toString(), value: 0 },
          ],
          implementationPeriod: { start: null, end: null },
          PAPLevel: 1,
          readiness: 1,
          status: 1,
        }
      : {
          title: project.title,
          GSP: project.GSP,
          obligationType: project.obligationType,
          proponent: project.proponent,
          investmentReq: project.investmentReq,
          implementationPeriod: project.implementationPeriod,
          PAPLevel: project.PAPLevel,
          readiness: project.readiness,
          status: project.status,
        }
  );

  const [form2Data, setForm2Data] = useState(
    isNew
      ? {
          suc: "Bulacan State University",
          address: "",
          projectLocation: "",
          categorization: {
            new: true,
            expanded: false,
            infrastructure: true,
            nonInfrastructure: false,
          },
          description: "",
          purpose: "",
          beneficiaries: "",
          proponentName: { surname: "", firstName: "", middleInitial: "" },
          designation: "",
          contactInformation: {
            telNumber: "",
            email: "",
            phoneNumber: "",
            others: "",
          },
          dateAccomplished: new Date().toISOString(),
        }
      : {
          address: project.address,
          projectLocation: project.projectLocation,
          categorization: project.categorization,
          description: project.description,
          purpose: project.purpose,
          beneficiaries: project.beneficiaries,
          proponentName: project.proponentName,
          designation: project.designation,
          contactInformation: project.contactInformation,
          dateAccomplished: project.dateAccomplished,
          signature: project.signature,
        }
  );

  const [oldFileList, setOldFileList] = useState(
    project ? project.fileList : []
  );

  const [fileList, setFileList] = useState([]);

  const [oldSignature, setOldSignature] = useState(
    project ? (project.signature ? [project.signature] : []) : []
  );

  const [signature, setSignature] = useState([]);

  const [checkerForm1, setCheckerForm1] = useState({
    title: {
      error: false,
      messages: [],
    },
    obligationType: {
      error: false,
      messages: [],
    },
    proponent: {
      error: false,
      messages: [],
    },
    investmentReq: [
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
    ],
    startYear: {
      error: false,
      messages: [],
    },
    endYear: {
      error: false,
      messages: [],
    },
  });

  const [checkerForm2, setCheckerForm2] = useState({
    email: {
      error: false,
      messages: [],
    },
    projectLocation: {
      error: false,
      messages: [],
    },
    description: {
      error: false,
      messages: [],
    },

    purpose: {
      error: false,
      messages: [],
    },

    beneficiaries: {
      error: false,
      messages: [],
    },

    surName: {
      error: false,
      messages: [],
    },

    firstName: {
      error: false,
      messages: [],
    },

    designation: {
      error: false,
      messages: [],
    },

    telephoneNumber: {
      error: false,
      messages: [],
    },

    phoneNumber: {
      error: false,
      messages: [],
    },
  });

  const removeComma = (items) =>
    items.map((item) => ({ ...item, value: item.value.replace(",", "") }));

  const handleSubmit = () => {
    if (isNew) {
      setIsLoading(true);
      Projects.create(
        {
          ...form1Data,
          ...form2Data,
          investmentReq: removeComma(form1Data.investmentReq),
          address: institutes.find(
            (institute) => institute.abbv === user.institute.abbv
          ).address,
          recievedBy: undefined,
          recieverDesignation: undefined,
          dateRecieved: undefined,
        },
        fileList,
        signature.length == 0 ? undefined : signature
      )
        .then(({ simple, full }) => {
          if (simple) {
            setSnackbarData({
              type: 0,
              message: "Project created",
            });
            history.push("/projects");
          } else {
            console.log(full);
            setSnackbarData({
              type: 3,
              message: "Failed to create project",
            });
          }
        })
        .catch((err) => {
          setSnackbarData({
            type: 3,
            message: err.message,
          });
          history.push("/projects");
        })
        .finally(() => {
          setIsLoading(false);
          setShowSnackbar(true);
        });
    } else {
      setIsLoading(true);
      Projects.edit(
        {
          ...project,
          ...form1Data,
          ...form2Data,
          investmentReq: removeComma(form1Data.investmentReq),
          fileList: oldFileList,
          signature: oldSignature.length ? oldSignature[0] : null,
        },
        fileList,
        signature.length == 0 ? null : signature
      )
        .then(({ simple, full }) => {
          if (simple) {
            setSnackbarData({
              type: 0,
              message: "Project edited",
            });
            history.push("/projects");
          } else {
            console.log(full);
            setSnackbarData({
              type: 3,
              message: "Failed to edit project",
            });
          }
        })
        .catch((err) => {
          setSnackbarData({
            type: 3,
            message: err.message,
          });
        })
        .finally(() => {
          setIsLoading(false);
          setShowSnackbar(true);
        });
    }
  };

  const formSelector = () => {
    switch (page) {
      case 1:
        return (
          <EditorForm1
            form1Data={form1Data}
            setForm1Data={setForm1Data}
            checkerForm1={checkerForm1}
          />
        );
      case 2:
        return (
          <EditorForm2
            form2Data={form2Data}
            setForm2Data={setForm2Data}
            checkerForm2={checkerForm2}
            fileList={fileList}
            setFileList={setFileList}
            signature={signature}
            setSignature={setSignature}
            oldFileList={oldFileList}
            setOldFileList={setOldFileList}
            oldSignature={oldSignature}
            setOldSignature={setOldSignature}
          />
        );
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h4">
          {isNew ? "New Project" : "Edit Project"}
        </Typography>
      </Toolbar>
      {!isNew && (
        <AppBreadcrumb
          links={[
            {
              link: "/projects",
              label: "Projects",
              icon: <LibraryBooks fontSize="small" />,
            },
            {
              link: `/projects/${project.id}`,
              label: project.title,
              icon: <Description fontSize="small" />,
            },
            {
              link: `/projects/${project.id}/edit`,
              label: "Edit",
              icon: <Edit fontSize="small" />,
            },
          ]}
        />
      )}
      {isNew && (
        <AppBreadcrumb
          links={[
            {
              link: "/projects",
              label: "Projects",
              icon: <LibraryBooks fontSize="small" />,
            },
            {
              link: `/projects/new`,
              label: "New",
              icon: <AddCircle fontSize="small" />,
            },
          ]}
        />
      )}
      <Divider className={classes.divider} />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                title={
                  page === 1 ? "Investment Programming Entry" : "PAPs Form"
                }
                subheader={
                  <Typography variant="body2">{`Page ${page} of 2`}</Typography>
                }
                className={classes.cardHeader}
                classes={{
                  action: classes.cardHeaderAction,
                }}
                action={
                  <React.Fragment>
                    {page === 2 && (
                      <Button variant="contained" onClick={() => setPage(1)}>
                        Previous
                      </Button>
                    )}
                    {page === 1 ? (
                      <Button
                        variant="contained"
                        onClick={() => {
                          var checker = form1Validator(form1Data);
                          if (
                            !checker.title.error &&
                            !checker.obligationType.error &&
                            !checker.proponent.error &&
                            !checker.startYear.error &&
                            !checker.endYear.error &&
                            checker.investmentReq
                              .map((item) => !item.error)
                              .reduce((a, b) => a && b)
                          ) {
                            setPage(2);
                          }
                          setCheckerForm1(checker);
                        }}
                        className={classes.button}
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => {
                          var checker = form2Validator(form2Data);
                          if (
                            !checker.projectLocation.error &&
                            !checker.description.error &&
                            !checker.purpose.error &&
                            !checker.beneficiaries.error &&
                            !checker.surName.error &&
                            !checker.firstName.error &&
                            !checker.telephoneNumber.error &&
                            !checker.email.error &&
                            !checker.phoneNumber.error
                          ) {
                            handleSubmit();
                          }
                          setCheckerForm2(checker);
                        }}
                        className={classes.button}
                      >
                        Submit
                      </Button>
                    )}
                  </React.Fragment>
                }
              />
              <CardContent>{formSelector()}</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default ProjectEditor;
