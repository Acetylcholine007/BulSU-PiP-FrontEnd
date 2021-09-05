import { makeStyles } from "@material-ui/core";
import {
  Container,
  Divider,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";

import NotificationList from "../components/NotificationList";

function NotificationPage({user}) {
  const useStyles = makeStyles({
    pageTitle: {
      flexGrow: 11,
    },
    divider: {
      marginBottom: 15
    }
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h4" className={classes.pageTitle}>
          {"Notifications"}
        </Typography>
      </Toolbar>
      <Divider classes={{root: classes.divider}}/>
      <Container>
        <NotificationList user = {user}/>
      </Container>
    </React.Fragment>
  );
}

export default NotificationPage;
