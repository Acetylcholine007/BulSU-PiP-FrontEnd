import { Container, Grid, Typography, Card } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProjectContext } from "../../../contexts/ProjectContext";
import AdminProjectControl from "../components/AdminProjectControl";
import ProjectEditor from "./ProjectEditor";

function AdminProjectViewer() {
  const { id } = useParams();
  const { projects } = useContext(ProjectContext);
  const [project, setProject] = useState(
    projects.filter((project) => project.id.toString() === id)[0]
  );

  console.log(id);
  console.log(project);

  return (
    <Container>
      <Grid container>
        <Grid item xs={9}>
          <Grid container>
            <Grid item xs={12}>
              <Card style={{ backgroundColor: "grey", padding: 10 }}>
              <Typography variant="h3">{project.title}</Typography>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">GSP:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.obligationType}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Proponent:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.proponent}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Investment Request:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.investmentReq}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Implementation Period:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">
                {project.implementationPeriod}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">PAP Level:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.PAPLevel}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Readiness:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.readiness}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Status:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{ProjectContext.status}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Remarks:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.remarks}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Address:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.address}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Project Location:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.projectLocation}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Categorization:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.categorization}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Description:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.description}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Purpose:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.purpose}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Beneficiary:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.beneficiary}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Proponent Name:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.proponentName}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Designation:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.designation}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Contact Information:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.contactInformation}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h4">Date Accomplished:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h4">{project.dateAccomplished}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <AdminProjectControl />
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminProjectViewer;
