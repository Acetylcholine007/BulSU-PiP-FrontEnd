import {
  Box,
  Grid,
  makeStyles,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Block } from "@material-ui/icons";
import React from "react";

function EmptyTableContent({ message, span }) {
  const useStyles = makeStyles((theme) => ({
    icon: {
      fontSize: "5em",
    },
  }));

  const classes = useStyles();

  return (
    <TableRow>
      <TableCell colSpan={span}>
        <Grid container align="center">
          <Grid item xs={12} align="center">
            <Block className={classes.icon} color="action" />
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h5">{message}</Typography>
          </Grid>
        </Grid>
      </TableCell>
    </TableRow>
  );
}

export default EmptyTableContent;
