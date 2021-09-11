import {
  Paper,
  Table,
  TableContainer,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  TextField,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  ListItemSecondaryAction,
  Card,
  List,
} from "@material-ui/core";
import { AddCircleOutline, Delete, Folder } from "@material-ui/icons";
import React from "react";

function EditorForm3({
  form3Data,
  setForm3Data,
  PDOSignature,
  setPDOSignature,
  oldPDOSignature,
  setOldPDOSignature,
  checkerForm3,
}) {
  const useStyles = makeStyles(() => ({
    table: {
      background: "linear-gradient(45deg, #800000 30%, #FF8E53 110%)",
    },
    divider: {
      margin: "20px 0px 20px 0px",
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
    textField: {
      fontSize: 20,
      color: "white",
      floatingLabelFocusStyle: {
        color: "white",
      },
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
                <TextField
                  onChange={(e) =>
                    setForm3Data({ ...form3Data, recievedBy: e.target.value })
                  }
                  label="Reciever Name"
                  variant="outlined"
                  fullWidth
                  error={checkerForm3.recievedBy.error}
                  value={form3Data.recievedBy}
                  helperText={
                    checkerForm3.recievedBy.error
                      ? checkerForm3.recievedBy.messages[0]
                      : null
                  }
                  InputProps={{ className: classes.textField }}
                  InputLabelProps={{ className: classes.textField }}
                />
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
                <TextField
                  onChange={(e) =>
                    setForm3Data({
                      ...form3Data,
                      recieverDesignation: e.target.value,
                    })
                  }
                  label="Reciever Designation"
                  variant="outlined"
                  fullWidth
                  error={checkerForm3.recieverDesignation.error}
                  value={form3Data.recieverDesignation}
                  helperText={
                    checkerForm3.recieverDesignation.error
                      ? checkerForm3.recieverDesignation.messages[0]
                      : null
                  }
                  InputProps={{ className: classes.textField }}
                  InputLabelProps={{ className: classes.textField }}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Date Recieved
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {new Date(form3Data.dateRecieved).toDateString()}
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {PDOSignature.length == 0 && oldPDOSignature.length == 0 ? (
                  <React.Fragment>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="pdoSignature"
                      multiple
                      type="file"
                      onChange={(e) =>
                        setPDOSignature(Object.values(e.target.files))
                      }
                    />
                    <label htmlFor="pdoSignature">
                      <Button
                        variant="contained"
                        component="span"
                        startIcon={<AddCircleOutline />}
                      >
                        Upload Signature
                      </Button>
                    </label>
                  </React.Fragment>
                ) : (
                  <List>
                    {oldPDOSignature.map((file, index) => (
                      <ListItem key={`${index}-old`} component={Card}>
                        {console.log(file)}
                        <ListItemAvatar>
                          <Avatar>
                            <Folder />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={file.title} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => setOldPDOSignature([])}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                    {PDOSignature.map((file, index) => (
                      <ListItem key={`${index}-new`} component={Card}>
                        {console.log(file)}
                        <ListItemAvatar>
                          <Avatar>
                            <Folder />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={file.name} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() => setPDOSignature([])}
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))}
                  </List>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default EditorForm3;
