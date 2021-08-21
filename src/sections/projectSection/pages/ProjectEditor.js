import { Button, Container, Grid, Typography } from "@material-ui/core";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Form1 from "../components/Form1";
import Form2 from "../components/Form2";
import { serverUrl } from "../../../utils/serverUrl";
import { AuthContext } from "../../../contexts/AuthContext";

function ProjectEditor({ isNew, project }) {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const {user} = useContext(AuthContext);
  const [form1Data, setForm1Data] = useState(
    isNew
      ? {
          title: "",
          GSP: "",
          obligationType: "",
          proponent: "",
          investmentReq: "",
          implementationPeriod: {start: '2021', end: '2025'},
          PAPLevel: 1,
          readiness: 1,
          status: "",
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
          address: "",
          projectLocation: "",
          categorization: {new: false, expanded: false, infrastructure: false, nonInfrastructure: false},
          description: "",
          purpose: "",
          beneficiary: "",
          proponentName: "",
          designation: "",
          contactInformation: "",
          dateAccomplished: "",
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
        return <Form1 form1Data={form1Data} setForm1Data={setForm1Data} />;
      case 2:
        return <Form2 form2Data={form2Data} setForm2Data={setForm2Data} />;
    }
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3">
            {isNew ? "New Project" : "Edit Project"}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {formSelector()}
        </Grid>
        <Grid item xs={6} align="center">
          {page === 2 && (
            <Button variant="contained" onClick={() => setPage(1)}>
              Previous
            </Button>
          )}
        </Grid>
        <Grid item xs={6} align="center">
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
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProjectEditor;
