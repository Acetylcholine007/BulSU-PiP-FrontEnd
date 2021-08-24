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

function ProjectEditor({ isNew, project }) {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const useStyles = makeStyles((theme) => ({
    card: {
      margin: 20,
    },
    cardHeader: {
      backgroundColor: "#d3d3d3",
    },
    cardActions: {
      backgroundColor: "#d3d3d3",
      alignItems: "center",
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

  const handleSubmit = () => {
    if (isNew) {
      fetch(`${serverUrl}projects`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          ...form1Data,
          ...form2Data,
          commentList: [],
          ownerId: user.id,
          priority: user.projectList.length + 1,
          address: institutes.find((institute) => institute.institute === user.institute.institute).address,
          recievedBy: "",
          recieverDesignation: "",
          designation: "",
          dateRecieved: "",
          pdoSignature: "",
        }),
      }).then(() => {
        history.push("/projects");
      });
    } else {
      fetch(`${serverUrl}projects/${project.id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          ...project,
          ...form1Data,
          ...form2Data,
        }),
      }).then(() => {
        history.push("/projects");
      });
    }
  };

  const formSelector = () => {
    switch (page) {
      case 1:
        return (
          <EditorForm1 form1Data={form1Data} setForm1Data={setForm1Data} />
        );
      case 2:
        return (
          <EditorForm2 form2Data={form2Data} setForm2Data={setForm2Data} />
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
      <Divider />
      <Container>
        <Grid container>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <CardHeader
                title={
                  page === 1 ? "Investment Program Form" : "Preparation Form"
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
                      //perform form1 validation
                      setPage(2);
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      //perform form2 validation
                      handleSubmit();
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
