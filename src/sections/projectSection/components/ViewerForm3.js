import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Card,
} from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import React from "react";

function ViewerForm3({ project, PDOSignature }) {
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
                {project.dateRecieved === "" || !project.dateRecieved
                  ? "Not yet recieved"
                  : new Date(project.dateRecieved).toDateString()}
              </TableCell>
              <TableCell align="center">
                {PDOSignature.length == 0 && project.pdoSignature && (
                  <img src={project.pdoSignature.src} height={100} />
                )}
                {PDOSignature.length !== 0 && (
                  <List>
                    {PDOSignature.map((file, index) => (
                      <ListItem key={`${index}-new`} component={Card}>
                        {console.log(file)}
                        <ListItemAvatar>
                          <Avatar>
                            <Folder />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={file.name} />
                      </ListItem>
                    ))}
                  </List>
                )}
                {PDOSignature.length == 0 && !project.pdoSignature && 'No PDO Signature'}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default ViewerForm3;
