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
  CardActions,
  Toolbar,
} from "@material-ui/core";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import EditorForm1 from "../components/EditorForm1";
import EditorForm2 from "../components/EditorForm2";
import { serverUrl } from "../../../utils/serverUrl";
import { AuthContext } from "../../../contexts/AuthContext";
import { institutes } from "../../../utils/constants";
import { form1Validator } from "../../../utils/form1Validator";
import form2Validator from "../../../utils/form2Validator";

function ProjectEditor({ isNew, project, institute }) {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const useStyles = makeStyles((theme) => ({
    cardHeader: {
      backgroundColor: theme.palette.tertiary.main,
    },
    cardActions: {
      backgroundColor: theme.palette.tertiary.main,
      display: "flex",
      justifyContent: "space-evenly",
    },
    divider: {
      marginBottom: 15
    },
    card: {
      marginBottom: 15
    }
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
            { year: currentDate.getFullYear().toString(), value: "" },
            { year: (currentDate.getFullYear() + 1).toString(), value: "" },
            { year: (currentDate.getFullYear() + 2).toString(), value: "" },
            { year: (currentDate.getFullYear() + 3).toString(), value: "" },
            { year: (currentDate.getFullYear() + 4).toString(), value: "" },
          ],
          implementationPeriod: { start: null, end: null },
          PAPLevel: 1,
          readiness: 1,
          status: 1,
          remarks: "",
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
          remarks: project.remarks,
        }
  );
  const [form2Data, setForm2Data] = useState(
    isNew
      ? {
          suc: "Bulacan State University",
          institute: user.institute,
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
          beneficiary: "",
          proposedProjectCost: [
            { year: "2021", cost: "0" },
            { year: "2021", cost: "0" },
            { year: "2021", cost: "0" },
          ],
          proponentName: { surname: "", firstName: "", middleInitial: "" },
          designation: "",
          contactInformation: {
            telNumber: "",
            email: "",
            phoneNumber: "",
            others: "",
          },
          dateAccomplished: new Date().toISOString(),
          signature: "",
          fileList: [],
        }
      : {
          address: project.address,
          projectLocation: project.projectLocation,
          categorization: project.categorization,
          description: project.description,
          purpose: project.purpose,
          beneficiary: project.beneficiary,
          proposedProjectCost: project.proposedProjectCost,
          proponentName: project.proponentName,
          designation: project.designation,
          contactInformation: project.contactInformation,
          dateAccomplished: project.dateAccomplished,
          signature: project.signature,
          fileList: project.fileList,
        }
  );

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

    beneficiary: {
      error: false,
      messages: [],
    },

    proposedProjectCost: [
      { error: false, messages: [] },
      { error: false, messages: [] },
      { error: false, messages: [] },
    ],

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

  const handleSubmit = () => {
    if (isNew) {
      var newId =
        Math.max.apply(
          null,
          institute.projects.map((project) => project.id)
        ) + 1;
      var newInstitute = { ...institute };
      newInstitute.projects.push({
        ...form1Data,
        ...form2Data,
        commentList: [],
        ownerId: user.id,
        address: institutes.find(
          (institute) => institute.institute === user.institute.institute
        ).address,
        recievedBy: "",
        recieverDesignation: "",
        designation: "",
        dateRecieved: "",
        pdoSignature: "",
        id: newId,
      });
      newInstitute.priority.push(newId);
      fetch(`${serverUrl}institutes/${institute.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newInstitute),
      }).then(() => {
        history.push("/projects");
      });
    } else {
      var newInstitute = { ...institute };
      var projectIndex = newInstitute.projects.indexOf(project);
      newInstitute.projects[projectIndex] = {
        ...newInstitute.projects[projectIndex],
        ...form1Data,
        ...form2Data,
      };
      fetch(`${serverUrl}institutes/${institute.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(newInstitute),
      }).then(() => {
        history.push("/projects");
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
      <Divider className={classes.divider} />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                title={
                  page === 1 ? "Investment Programming Entry" : "PAPs Form"
                }
                subheader={`Page ${page} of 2`}
                className={classes.cardHeader}
              />
              <CardContent>{formSelector()}</CardContent>
              <CardActions className={classes.cardActions}>
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
                      console.log(checker);
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
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      var checker = form2Validator(form2Data);
                      console.log(checker);
                      if (
                        !checker.projectLocation.error &&
                        !checker.description.error &&
                        !checker.purpose.error &&
                        !checker.beneficiary.error &&
                        !checker.surName.error &&
                        !checker.firstName.error &&
                        !checker.telephoneNumber.error &&
                        !checker.email.error &&
                        !checker.phoneNumber.error &&
                        checker.proposedProjectCost
                          .map((item) => !item.error)
                          .reduce((a, b) => a && b)
                      ) {
                        console.log('submitted')
                        //handleSubmit();
                      }
                      setCheckerForm2(checker);
                    }}
                  >
                    Submit
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default ProjectEditor;
