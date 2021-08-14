import { Button, Container, Grid, Typography } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import Form1 from "../components/Form1";
import Form2 from "../components/Form2";
import { serverUrl } from "../../../utils/serverUrl";

function ProjectEditor({ isNew, user }) {
  const [page, setPage] = useState(1);
  const history = useHistory();
  const [form1Data, setForm1Data] = useState({
    title: "",
    GSP: "",
    obligationType: "",
    proponent: "",
    investmentReq: "",
    implementationPeriod: "",
    PAPLevel: "",
    readiness: "",
    status: "",
    remarks: "",
  });
  const [form2Data, setForm2Data] = useState({
    address: "",
    projectLocation: "",
    categorization: "",
    description: "",
    purpose: "",
    beneficiary: "",
    proponentName: "",
    designation: "",
    contactInformation: "",
    dateAccomplished: "",
    signature: "",
    fileList: [],
  });
  const handleSubmit = () => {
    console.log({ ...form1Data, ...form2Data });

    if(isNew) {
      fetch(`${serverUrl}projects`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({...form1Data, ...form2Data, commentList: [], ownerId: user.id}),
      }).then(() => {
        history.push("/projects");
      });
    } else {
      fetch(`${serverUrl}projects`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({...form1Data, ...form2Data}),
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
