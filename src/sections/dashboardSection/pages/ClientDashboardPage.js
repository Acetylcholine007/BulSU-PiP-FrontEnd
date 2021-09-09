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
  List,
  ListItem,
  Box,
} from "@material-ui/core";
import { LaunchOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

import AdminProjectChart from "../components/AdminProjectChart";
import CostChart from "../components/CostChart";
import DashboardNotificationList from "../components/DashboardNotificationList";
import NotificationModal from "../../notificationSection/components/NotificationModal";
import ClientProjectChart from "../components/ClientProjectChart";

function ClientDashboardPage({ data, user }) {
  const [open, setOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const selectNotification = (notification) => {
    setNotification(notification);
    setOpen(true);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      [theme.breakpoints.up('md')]: {height: "100%",
      display: "flex",
      flexDirection: "column",}
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
      height: '100%',
      overflowY: "auto",
      padding: '0px 20px 0px 20px'

    },
    avatarLogo: {
      width: "auto",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    card: {
      height: '100%',
    },
    cardHeader: {
      background: "linear-gradient(45deg, #800000 30%, #FF8E53 90%)",
      color: "white",
      height: 50,
      border: 0,
      borderRadius: 3,
    },
    cardContent: {
      height: '100%',
      overflowY: 'auto'
    },
    gridContainer: {
      height: '100%'
    },
    gridItem: {
      padding: 10,
      height: '100%'
    },
    innerGridContainer: {
      padding: '10px 0px 10px 0px',
      height: '100%'
    },
    upperInnerGridItem: {
      padding: '0px 10px 10px 10px',
      height: '50%'
    },
    lowerInnerGridItem: {
      padding: '10px 10px 0px 10px',
      height: '50%'
    },
    list: {
    },
    barGraph: {
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    institute: {
      height: 100,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }));

  const classes = useStyles();
  const history = useHistory();

  const statusContent = (status) => {
    let projects = user.projectList.filter(
      (project) => project.status == status
    );
    if (projects.length == 0) {
      return <Typography>There is no content for now</Typography>;
    } else if (projects.length <= 3) {
      return (
        <List>
          {projects.map((item, index) => (
            <ListItem>{item.title}</ListItem>
          ))}
        </List>
      );
    } else {
      return (
        <List>
          {projects.slice(0, 3).map((item) => (
            <ListItem>{item.title}</ListItem>
          ))}
        </List>
      );
    }
  };

  return (
    <Container className={classes.root}>
      <Box style={{ flexGrow: 5 }}>
        <Grid container className={classes.gridContainer}>
          <Grid item md={8} xs={12} className={classes.innerGridContainer}>
            <Grid container className={classes.gridContainer}>
              <Grid item md={2} xs={3} className={classes.upperInnerGridItem}>
                <Avatar
                  className={classes.avatarLogo}
                  src={user.institute.profile_img.src}
                />
              </Grid>
              <Grid item md={7} xs={9} className={classes.upperInnerGridItem}>
                <Typography className={classes.institute} variant="h4">
                  {" "}
                  {user.type == 0
                    ? `${user.institute.institute}`
                    : "BulSU Projects"}{" "}
                </Typography>
              </Grid>
              <Grid item md={3} xs={12} className={classes.upperInnerGridItem}>
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardTextHeader}
                    title="Completed"
                  />
                  <CardContent className={classes.cardTextContent}>
                    {statusContent(4)}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={3} xs={6} className={classes.lowerInnerGridItem}>
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardTextHeader}
                    title="Revision"
                  />
                  <CardContent className={classes.cardTextContent}>
                    {statusContent(2)}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={3} xs={6} className={classes.lowerInnerGridItem}>
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardTextHeader}
                    title="On-Going"
                  />
                  <CardContent className={classes.cardTextContent}>
                    {statusContent(3)}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={3} xs={6} className={classes.lowerInnerGridItem}>
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardTextHeader}
                    title="Rejected"
                  />
                  <CardContent className={classes.cardTextContent}>
                    {statusContent(0)}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item md={3} xs={6} className={classes.lowerInnerGridItem}>
                <Card className={classes.card}>
                  <CardHeader
                    className={classes.cardTextHeader}
                    title="Proposed"
                  />
                  <CardContent className={classes.cardTextContent}>
                    {statusContent(1)}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={4} xs={12} className={classes.gridItem}>
            <Card style={{height: '100%'}}>
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
              <CardContent className={classes.barGraph}> 
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
          <Grid item md={7} xs={12} className={classes.gridItem}>
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
              <CardContent className = {classes.cardContent}>
                <CostChart costs={data.costs} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={5} xs={12} className={classes.gridItem}>
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
              <CardContent className = {classes.cardContent}>
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

export default ClientDashboardPage;
