import React, { useState } from "react";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
  List,
  ListItem,
  Box,
  Hidden,
} from "@material-ui/core";
import { Block } from "@material-ui/icons";

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
      [theme.breakpoints.up("md")]: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
      padding: "0px 20px",
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
      overflowY: "auto",
      padding: "5px 20px 5px 20px",
      fontWeight: 600,
    },
    avatarLogo: {
      width: "auto",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    card: {
      height: "100%",
      borderRadius: 20,
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
    institute: {
      fontSize: 40,
      fontWeight: "bold",
      marginTop: 15,
    },
    listItem: {
      border: "1px solid",
      borderColor: theme.palette.grey[300],
      borderRadius: 5,
      marginBottom: 10,
      backgroundColor: theme.palette.grey[300],
    },
    icon: {
      fontSize: "5em",
    },
  }));

  const classes = useStyles();

  const statusContent = (status, label) => {
    let projects = user.projectList.filter(
      (project) => project.status == status
    );
    if (projects.length == 0) {
      return (
        <Grid container>
          <Grid item xs={12} align="center">
            <Block className={classes.icon} color="action" />
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="body1">{`No ${label} projects yet`}</Typography>
          </Grid>
        </Grid>
      );
    } else if (projects.length <= 3) {
      return (
        <List>
          {projects.map((item, index) => (
            <ListItem className={classes.listItem}>{item.title}</ListItem>
          ))}
        </List>
      );
    } else {
      return (
        <List>
          {projects.slice(0, 3).map((item) => (
            <ListItem className={classes.listItem}>{item.title}</ListItem>
          ))}
        </List>
      );
    }
  };

  return (
    <Box className={classes.root}>
      <Box style={{ flexGrow: 1 }}>
        <Grid container className={classes.gridContainer}>
          <Grid item md={8} xs={12} className={classes.innerGridContainer}>
            <Grid container className={classes.gridContainer}>
              <Grid item md={9} xs={9} className={classes.upperInnerGridItem}>
                <Box
                  display="flex"
                  alignItems="center"
                  style={{ height: "100%" }}
                >
                  <Avatar
                    className={classes.avatarLogo}
                    src={user.institute.profile_img.src}
                  />
                  <Typography
                    variant="h4"
                    style={{
                      verticalAlign: "middle",
                      paddingLeft: "1em",
                      fontWeight: "bold",
                    }}
                  >
                    {" "}
                    {user.type == 0
                      ? `${user.institute.institute}`
                      : "BulSU Projects"}{" "}
                  </Typography>
                </Box>
              </Grid>
              <Hidden xsDown>
                <Grid
                  item
                  md={3}
                  xs={12}
                  className={classes.upperInnerGridItem}
                >
                  <Card className={classes.card}>
                    <CardHeader
                      className={classes.cardTextHeader}
                      title="Completed"
                    />
                    <CardContent className={classes.cardTextContent}>
                      {statusContent(4, "Completed")}
                    </CardContent>
                  </Card>
                </Grid>
              </Hidden>
              <Hidden xsDown>
                <Grid item md={3} xs={6} className={classes.lowerInnerGridItem}>
                  <Card className={classes.card}>
                    <CardHeader
                      className={classes.cardTextHeader}
                      title="Proposed"
                    />
                    <CardContent className={classes.cardTextContent}>
                      {statusContent(1, "Proposed")}
                    </CardContent>
                  </Card>
                </Grid>
              </Hidden>
              <Hidden xsDown>
                <Grid item md={3} xs={6} className={classes.lowerInnerGridItem}>
                  <Card className={classes.card}>
                    <CardHeader
                      className={classes.cardTextHeader}
                      title="Revision"
                    />
                    <CardContent className={classes.cardTextContent}>
                      {statusContent(2, "Revision")}
                    </CardContent>
                  </Card>
                </Grid>
              </Hidden>
              <Hidden xsDown>
                <Grid item md={3} xs={6} className={classes.lowerInnerGridItem}>
                  <Card className={classes.card}>
                    <CardHeader
                      className={classes.cardTextHeader}
                      title="On-Going"
                    />
                    <CardContent className={classes.cardTextContent}>
                      {statusContent(3, "On-Going")}
                    </CardContent>
                  </Card>
                </Grid>
              </Hidden>
              <Hidden xsDown>
                <Grid item md={3} xs={6} className={classes.lowerInnerGridItem}>
                  <Card className={classes.card}>
                    <CardHeader
                      className={classes.cardTextHeader}
                      title="Rejected"
                    />
                    <CardContent className={classes.cardTextContent}>
                      {statusContent(0, "Rejected")}
                    </CardContent>
                  </Card>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item md={4} xs={12} className={classes.gridItem}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <ClientProjectChart
                  rawData={data.projects}
                  title={`${user.institute.institute} Projects`}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ flexGrow: 2 }}>
        <Grid container className={classes.gridContainer}>
          <Grid item md={7} xs={12} className={classes.gridItem}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <CostChart costs={data.costs} />
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={5} xs={12} className={classes.gridItem}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
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
    </Box>
  );
}

export default ClientDashboardPage;
