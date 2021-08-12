import { Container, Grid } from "@material-ui/core";
import React from "react";

import DashboardProjectCard from "./DashboardProjectCard";

function DashboardProjectSection({ projectStatus }) {
  return (
    <Container>
      <Grid container spacing = {2} style = {{backgroundColor: '#808080'}}>
        {["Approved", "Revision", "Reject", "Pending"].map((type) => (
          <Grid item xs={12}>
            <DashboardProjectCard title = {type} count={3} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DashboardProjectSection;
