import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  makeStyles,
  Typography,
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
      background: 'linear-gradient(45deg, #800000 30%, #FF8E53 90%)',
      color: 'white',
      height: 50,
      border: 0,
      borderRadius: 3,
    },
    cardTextHeader: {
      fontSize: 35,
      background: '#800000',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      textAlign: 'center'
    },
    cardTextContent: {
      fontSize: 25,
      textAlign: 'center'
    },
    avatarLogo: {
      width: 'auto',
      height: 'auto',
      justifyContent: 'center'
    },
    test: {
      height: '100%'
    },
    institue: {
      paddingTop: 20
    }
  }));

  const classes = useStyles();
  const history = useHistory();

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <Grid container spacing={4}>
            <Grid item md={2} xs={3}>
              <Avatar 
              className={classes.avatarLogo}
              src={user.institute.profile_img.src} />
            </Grid>
            <Grid item md={7} xs={9}>
              <Typography  variant="h4"> {
                user.type == 0
                  ? `${user.institute.institute}`
                  : "BulSU Projects"
              } </Typography>
            </Grid>
            <Grid item md={3} xs={12}>
            <Card>
                <CardHeader
                  className={classes.cardTextHeader}
                  title="Completed"
                />
                <CardContent className={classes.cardTextContent}>
                  sample
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={3} xs={6}>
              <Card>
                <CardHeader
                  className={classes.cardTextHeader}
                  title="Revision"
                />
                <CardContent className={classes.cardTextContent}>
                  sample
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={3} xs={6}>
              <Card>
                <CardHeader
                className={classes.cardTextHeader} 
                title="On-Going" />
                <CardContent className={classes.cardTextContent}>sample</CardContent>
              </Card>
            </Grid>
            <Grid item md={3} xs={6}>
              <Card>
                <CardHeader 
                className={classes.cardTextHeader}
                title="Rejected" />
                <CardContent className={classes.cardTextContent}>sample</CardContent>
              </Card>
            </Grid>
            <Grid item md={3} xs={6}>
              <Card>
                <CardHeader 
                className={classes.cardTextHeader}
                title="Proposed" />
                <CardContent className={classes.cardTextContent}>sample</CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={4} xs={12}>
          <Card>
            <CardHeader
              title={"Projects"}
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
        <Grid item md={7} xs={12}>
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
        <Grid item md={5} xs={12}>
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
