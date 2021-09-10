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
} from "@material-ui/core";

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
    <Box className={classes.root}>
      <Box style={{ flexGrow: 1 }}>
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
                <Typography variant="h4">
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
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
              <ClientProjectChart rawData={data.projects} title={`${user.institute.institute} Projects`}/>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box style={{ flexGrow: 7 }}>
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
