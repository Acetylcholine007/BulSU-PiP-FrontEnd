import React, { useState } from "react";
import {
  Box,
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

function AdminDashboardPage({ data, user }) {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const selectNotification = (notification) => {
    setNotification(notification);
    setOpen(true);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      [theme.breakpoints.up("md")]: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
    },
    cardTextHeader: {
      fontSize: 35,
      background: "#800000",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      textAlign: "center",
    },
    cardTextContent: {
      fontSize: 15,
      textAlign: "left",
      height: "100%",
      overflowY: "scroll",
      padding: "0px 20px 0px 20px",
    },
    avatarLogo: {
      width: "auto",
      height: "auto",
      justifyContent: "center",
    },
    card: {
      height: "100%",
    },
    cardHeader: {
      background: "linear-gradient(45deg, #800000 30%, #FF8E53 90%)",
      color: "white",
      height: 50,
      border: 0,
      borderRadius: 3,
    },
    cardContent: {
      height: "100%",
      overflowY: "auto",
    },
    gridContainer: {
      height: "100%",
    },
    gridItem: {
      padding: 10,
      height: "100%",
    },
    innerGridContainer: {
      padding: "10px 0px 10px 0px",
      height: "100%",
    },
    upperInnerGridItem: {
      padding: "0px 10px 10px 10px",
      height: "50%",
    },
    lowerInnerGridItem: {
      padding: "10px 10px 0px 10px",
      height: "50%",
    },
    list: {},
  }));

  const classes = useStyles();
  const history = useHistory();

  console.log(user);

  return (
    <Container className={classes.root}>
      <Box style={{ flexGrow: 1 }}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12} className={classes.gridItem}>
            <Card className={classes.card}>
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
        </Grid>
      </Box>
      <Box style={{ flexGrow: 1 }}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={7} className={classes.gridItem}>
            <Card className={classes.card}>
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
          <Grid item xs={5} className={classes.gridItem}>
            <Card className={classes.card}>
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
      </Box>
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

export default AdminDashboardPage;
