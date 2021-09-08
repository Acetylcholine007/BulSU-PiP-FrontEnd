import { Box, Container, makeStyles } from "@material-ui/core";
import React from "react";
import Spinner from "react-spinkit";

function LoadingComponent() {
  const useStyles = makeStyles(() => ({
    flexContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    spinner: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  return (
    <Container align="center" className={classes.flexContainer}>
      <Box className={classes.spinner}>
        <Spinner name="chasing-dots" color="coral" />
      </Box>
    </Container>
  );
}

export default LoadingComponent;
