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
  checkerForm3
}) {
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
                <TextField
                  onChange={(e) =>
                    setForm3Data({ ...form3Data, recievedBy: e.target.value })
                  }
                  label="Reciever Name"
                  variant="outlined"
                  fullWidth
                  error={checkerForm3.recievedBy.error}
                  value={form3Data.recievedBy}
                  helperText={checkerForm3.recievedBy.error ? checkerForm3.recievedBy.messages[0] : null}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Designation</TableCell>
              <TableCell align="center" colSpan={2}>
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
                  helperText={checkerForm3.recieverDesignation.error ? checkerForm3.recieverDesignation.messages[0] : null}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Date Recieved</TableCell>
              <TableCell align="center">
                {new Date(form3Data.dateRecieved).toDateString()}
              </TableCell>
              <TableCell align="center">
                {PDOSignature.length == 0 ? (
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
                    <Card>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <Folder />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={PDOSignature[0].name} />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            onClick={() =>
                              setPDOSignature(() => {
                                var newList = [...PDOSignature];
                                newList.splice(0, 1);
                                return newList;
                              })
                            }
                          >
                            <Delete />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </Card>
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
