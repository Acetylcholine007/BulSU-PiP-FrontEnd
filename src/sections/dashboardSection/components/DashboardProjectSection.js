import { Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";

import DashboardProjectCard from "./DashboardProjectCard";

const useStyles = makeStyles({
  crd: {
    marginTop: 30,
  },
});

function DashboardProjectSection({ projectStatus }) {
  const classes = useStyles();
  return (
    <Container className={classes.crd}>
      <Grid container spacing={3} style={{ backgroundColor: "#E1D8D8" }}>
        {[
          {
            title: "Approved",
            color: "#4caf50",
          },
          {
            title: "Revision",
            color: "#cddc39",
          },
          {
            title: "Reject",
            color: "#f44336",
          },
          {
            title: "Pending",
            color: "#2196f3",
          },
        ].map((type) => (
          <Grid item xs={12}>
            <DashboardProjectCard
              title={type.title}
              count={0}
              color={type.color}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default DashboardProjectSection;
