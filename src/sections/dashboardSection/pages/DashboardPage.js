import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { LaunchOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import AdminProjectChart from "../components/AdminProjectChart";
import CostChart from "../components/CostChart";
import DashboardNotificationList from "../components/DashboardNotificationList";
import NotificationModal from "../../notificationSection/components/NotificationModal";
import ClientProjectChart from "../components/ClientProjectChart";

function DashboardPage({ data, user }) {
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
                <AdminProjectChart rawData={data.projects} />
              ) : (
                <ClientProjectChart rawData={data.projects} />
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
              <CostChart costs={data.costs} />
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
                notifications={user.notificationList}
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
  );
}

export default DashboardPage;
