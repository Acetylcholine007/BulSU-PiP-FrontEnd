import { Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";

import DashboardProjectCard from "./DashboardProjectCard";

const useStyles = makeStyles({
  crd: {
      marginTop: 30
  }
})

function DashboardProjectSection({ projectStatus }) {
  const classes = useStyles()
  return (
    <Container className={classes.crd}>
      <Grid container spacing={3} style={{ backgroundColor: "#E1D8D8" }}>
        {["Approved", "Revision", "Reject", "Pending"].map((type) => (
          <Grid item xs={12}>
            <DashboardProjectCard title={type} count={3} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DashboardProjectSection;
