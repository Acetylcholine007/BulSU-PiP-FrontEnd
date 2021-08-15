import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

import DashboardNotificationCard from "./DashboardNotificationCard";
import { AuthContext } from "../../../contexts/AuthContext";

const useStyles = makeStyles({
  btn: {
    marginTop: 25,
  },
  txt: {
    marginTop: 25,
  },
});

function DashboardNotifSection({ notifications }) {
  const classes = useStyles();
  const history = useHistory();
  const {user: {notificationList}} = useContext(AuthContext);

  return (
    <Grid container spacing={1}>
      <Grid item xs={10}>
        <Typography className={classes.txt} variant="h3">
          Notifications
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Button
          className={classes.btn}
          variant="contained"
          color="primary"
          onClick={() => history.push("/notifications")}
        >
          View All
        </Button>
      </Grid>
      <Grid item xs={12}>
        {notificationList.map((notification) => (
          <DashboardNotificationCard notification={notification} />
        ))}
      </Grid>
    </Grid>
  );
}

export default DashboardNotifSection;
