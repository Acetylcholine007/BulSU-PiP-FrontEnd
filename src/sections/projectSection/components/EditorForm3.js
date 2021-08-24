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
} from "@material-ui/core";
import React from "react";

function EditorForm3({ form3Data, setForm3Data }) {
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
                    setForm3Data({...form3Data, recievedBy: e.target.value})
                  }
                  label="Reciever Name"
                  variant="outlined"
                  fullWidth
                  error={false}
                  value={form3Data.recievedBy}
                  helperText={false ? "Error Password" : null}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Designation</TableCell>
              <TableCell align="center" colSpan={2}>
                <TextField
                  onChange={(e) =>
                    setForm3Data({...form3Data, recieverDesignation: e.target.value})
                  }
                  label="Reciever Designation"
                  variant="outlined"
                  fullWidth
                  error={false}
                  value={form3Data.recieverDesignation}
                  helperText={false ? "Error Password" : null}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Date Recieved</TableCell>
              <TableCell align="center">{(new Date(form3Data.dateRecieved)).toDateString()}</TableCell>
              <TableCell align="center">
                <Button variant="contained">Upload Signature</Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default EditorForm3;
