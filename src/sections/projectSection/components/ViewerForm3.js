import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  Checkbox,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
} from "@material-ui/core";
import React from "react";

function ViewerForm3({ project, selectComment }) {
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
      <Divider classes={{ root: classes.divider }} />
      <Typography variant="h6">Comments</Typography>
      <List>
        {project.commentList.map((comment) => (
          <Card onClick = {() => selectComment(comment)}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`${comment.header} — ${(new Date(comment.datetime)).toDateString()}`}
                secondary={
                  <React.Fragment>
                    <Divider />
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {comment.message}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          </Card>
        ))}
      </List>
    </React.Fragment>
  );
}

export default ViewerForm3;
