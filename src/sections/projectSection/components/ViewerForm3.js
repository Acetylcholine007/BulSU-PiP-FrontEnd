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
  Card,
} from "@material-ui/core";
import { Folder } from "@material-ui/icons";
import React from "react";

function ViewerForm3({ project, PDOSignature }) {
  const useStyles = makeStyles(() => ({
    table: {
      background: "linear-gradient(45deg, #800000 30%, #FF8E53 110%)",
    },
    rowTitle: {
      fontSize: 20,
      fontStyle: "Bold",
      color: "white",
      borderRight: "solid 1px",
    },
    rowContent: {
      fontSize: 20,
      color: "white",
      borderLeft: "solid 1px",
    },
    divider: {
      margin: "20px 0px 20px 0px",
    },
  }));

  const classes = useStyles();

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableBody>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Recieved By
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={2}
              >
                {project.recievedBy}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Designation
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={2}
              >
                {project.recieverDesignation}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Date Recieved
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {project.dateRecieved === "" || !project.dateRecieved
                  ? "Not yet recieved"
                  : new Date(project.dateRecieved).toDateString()}
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {PDOSignature.length == 0 && project.pdoSignature && (
                  <img
                    src={project.pdoSignature.src}
                    height={100}
                    alt="PDO signature"
                  />
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
                {PDOSignature.length == 0 &&
                  !project.pdoSignature &&
                  "No PDO Signature"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default ViewerForm3;
