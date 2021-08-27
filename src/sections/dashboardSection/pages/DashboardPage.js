import React, { useContext } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
} from "@material-ui/core";

import AdminProjectChart from "../components/AdminProjectChart";
import { serverUrl } from "../../../utils/serverUrl";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import useFetch from "../../../hooks/useFetch";
import CostChart from "../components/CostChart";
import DashboardNotificationList from "../components/DashboardNotificationList";
import { useState } from "react";
import NotificationModal from "../../notificationSection/components/NotificationModal";
import { AuthContext } from "../../../contexts/AuthContext";
import ClientProjectChart from "../components/ClientProjectChart";
import { makeStyles } from "@material-ui/core";
import { LaunchOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

function DashboardPage() {
  const { user } = useContext(AuthContext);

  const {
    error,
    isPending,
    data: dashboard,
  } = useFetch(
    `${serverUrl}${user.type == 0 ? "userDashboard" : "editorDashboard"}`
  );

  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const selectNotification = (notification) => {
    setNotification(notification);
    setOpen(true);
  };

  const useStyles = makeStyles((theme) => ({
    cardHeader: {
      backgroundColor: theme.palette.tertiary.main,
    },
  }));

  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      {error && <ErrorComponent message="Can't display dashboard data" />}
      {isPending && <LoadingComponent />}
      {dashboard && (
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card>
                <CardHeader
                  title={
                    user.type == 0
                      ? `${user.institute.institute} Projects`
                      : "BulSU Projects"
                  }
                  className={classes.cardHeader}
                  action={
                    <IconButton
                      onClick={() => {
                        switch (user.type) {
                          case 0:
                            history.push("/projects");
                            break;
                          case 1:
                            history.push("/institutes");
                            break;
                          case 2:
                            history.push("/institutes");
                            break;
                        }
                      }}
                    >
                      <LaunchOutlined />
                    </IconButton>
                  }
                />
                <CardContent>
                  {user.type == 1 ? (
                    <AdminProjectChart rawData={dashboard.projects} />
                  ) : (
                    <ClientProjectChart rawData={dashboard.projects} />
                  )}
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={7}>
              <Card>
                <CardHeader
                  title="Total Cost Distribution"
                  className={classes.cardHeader}
                  action={
                    <IconButton
                      onClick={() => {
                        switch (user.type) {
                          case 0:
                            history.push("/projects");
                            break;
                          case 1:
                            history.push("/institutes");
                            break;
                          case 2:
                            history.push("/institutes");
                            break;
                        }
                      }}
                    >
                      <LaunchOutlined />
                    </IconButton>
                  }
                />
                <CardContent>
                  <CostChart
                    rawInvestmentCost={dashboard.investmentCosts}
                    rawProjectCost={dashboard.projectCost}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={5}>
              <Card>
                <CardHeader
                  title="Notifications"
                  className={classes.cardHeader}
                  action={
                    <IconButton
                      onClick={() => {
                        history.push("/notifications");
                      }}
                    >
                      <LaunchOutlined />
                    </IconButton>
                  }
                />
                <CardContent>
                  <DashboardNotificationList
                    selectNotification={selectNotification}
                  />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          {notification && (
            <NotificationModal
              open={open}
              setOpen={setOpen}
              notification={notification}
            />
          )}
        </Container>
      )}
    </React.Fragment>
  );
}

export default DashboardPage;
