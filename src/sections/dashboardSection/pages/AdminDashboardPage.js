import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  makeStyles,
} from "@material-ui/core";

import AdminProjectChart from "../components/AdminProjectChart";
import CostChart from "../components/CostChart";
import DashboardNotificationList from "../components/DashboardNotificationList";
import NotificationModal from "../../notificationSection/components/NotificationModal";

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

  console.log(user);

  return (
    <Box className={classes.root}>
      <Box style={{ flexGrow: 1 }}>
        <Grid container className={classes.gridContainer}>
          <Grid item xs={12} className={classes.gridItem}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
              <AdminProjectChart rawData={data.projects} title='BulSU Projects' />
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

export default AdminDashboardPage;
