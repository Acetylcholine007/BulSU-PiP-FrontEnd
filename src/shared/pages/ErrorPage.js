import { Box, Grid, makeStyles, Typography } from "@material-ui/core";
import { ErrorTwoTone } from "@material-ui/icons";
import React from "react";

function ErrorPage({ message }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: "relative",
    },
    bottom: {
      color: theme.palette.grey[300],
    },
    top: {
      color: "#ab003c",
      animationDuration: "550ms",
      position: "absolute",
      left: 0,
    },
    circle: {
      strokeLinecap: "round",
    },
    container: {
      height: "100vh",
      position: "relative",
    },
    child: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    icon: {
        fontSize: "10em"
    }
  }));

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <div className={classes.child}>
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12} align="center">
              <ErrorTwoTone className={classes.icon} color="error" />
            </Grid>
            <Grid item xs={12} align="center">
              <Typography variant="h3">{message}</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
  );
}

export default ErrorPage;
