import {
  Box,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import React from "react";

function LoadingComponent() {
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
      height: "100%",
      position: "relative",
    },
    child: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  }));

  const classes = useStyles();

  return (
    <Box className={classes.container}>
    <div className={classes.child}>
      <div className={classes.root}>
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={100}
          thickness={8}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          classes={{
            circle: classes.circle,
          }}
          size={100}
          thickness={8}
        />
      </div>
      </div>
    </Box>
  );
}

export default LoadingComponent;
