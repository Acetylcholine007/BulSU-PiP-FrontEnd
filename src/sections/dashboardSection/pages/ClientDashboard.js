import React from "react";
import { Container, Divider, Grid, makeStyles } from "@material-ui/core";

import DashboardAccountSection from "../components/DashboardAccountSection";
import DashboardProjectSection from "../components/DashboardProjectSection";
import DashboardNotifSection from "../components/DashboardNotifSection";

const useStyles = makeStyles({
  dv: {
    marginTop: 25
  }
})

function ClientDashboard({ user }) {
  const getNotifications = () => {
    return [
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis animi similique fuga, placeat aperiam doloremque numquam nobis, voluptas assumenda fugit impedit expedita ducimus voluptatibus magnam, exercitationem sequi esse obcaecati illo.",
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis animi similique fuga, placeat aperiam doloremque numquam nobis, voluptas assumenda fugit impedit expedita ducimus voluptatibus magnam, exercitationem sequi esse obcaecati illo.",
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis animi similique fuga, placeat aperiam doloremque numquam nobis, voluptas assumenda fugit impedit expedita ducimus voluptatibus magnam, exercitationem sequi esse obcaecati illo.",
    ];
  };

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
          <DashboardNotifSection notifications={getNotifications()} />
        </Grid>
        <Grid item md={3} xs={12}>
          <DashboardProjectSection projectStatus={getProjectStatus()} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default ClientDashboard;
