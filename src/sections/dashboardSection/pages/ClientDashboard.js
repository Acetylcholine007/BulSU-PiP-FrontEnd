import React from "react";
import { Container, Divider, Grid, makeStyles } from "@material-ui/core";

import DashboardAccountSection from "../components/DashboardAccountSection";
import DashboardProjectSection from "../components/DashboardProjectSection";
import DashboardNotifSection from "../components/DashboardNotifSection";


const useStyles = makeStyles({
  dv: {
    marginTop: 30
  },
})

function ClientDashboard({ user }) {
  const getProjectStatus = () => {
    return { approved: 0, revision: 0, reject: 0, pending: 0 };
  };
  
  const classes = useStyles()
  return (
    <Container>
      <Grid container>
        <Grid item md={9} xs={12}>
          <DashboardAccountSection user={user} />
          <Divider className={classes.dv}/>
          <DashboardNotifSection notifications={user.notificationList} />
        </Grid>
        <Grid item md={3} xs={12}>
          <DashboardProjectSection projectStatus={getProjectStatus()} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ClientDashboard;
