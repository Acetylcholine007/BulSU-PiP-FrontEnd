import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
} from "@material-ui/core";
import React from "react";

function ViewerForm3({ project }) {
  const useStyles = makeStyles(() => ({
    table: {
      minWidth: 700,
    },
    divider: {
      margin: "20px 0px 20px 0px",
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table classname={classes.table} aria-label="spanning table">
          <TableBody>
            <TableRow>
              <TableCell align="center">Recieved By</TableCell>
              <TableCell align="center" colSpan={2}>
                {project.recievedBy}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Designation</TableCell>
              <TableCell align="center" colSpan={2}>
                {project.recieverDesignation}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Date Recieved</TableCell>
              <TableCell align="center">
                {project.dateRecieved === ""
                  ? "Not yet recieved"
                  : new Date(project.dateRecieved).toDateString()}
              </TableCell>
              <TableCell align="center">Signature Here</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default ViewerForm3;
