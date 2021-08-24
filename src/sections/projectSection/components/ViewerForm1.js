import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  makeStyles,
  TextField,
} from "@material-ui/core";
import React, { useContext } from "react";

import { AuthContext } from "../../../contexts/AuthContext";
import { papLevels, readinessLevels, statuses } from "../../../utils/constants";
import GSPViewer from "./GSPViewer";

function ViewerForm1({ project, investmentReq, setInvestmentReq, status }) {
  const useStyles = makeStyles(() => ({
    table: {
      minWidth: 700,
    },
  }));
  const classes = useStyles();
  const startDate = new Date(project.implementationPeriod.start);
  const finishDate = new Date(project.implementationPeriod.end);
  const { user } = useContext(AuthContext);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Item</TableCell>
            <TableCell align="center" colSpan={5}>
              Particulars
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow></TableRow>
          <TableRow>
            <TableCell align="center">Project/Activity/Program Title</TableCell>
            <TableCell align="center" colSpan={5}>
              {project.title}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">GSPs</TableCell>
            <TableCell align="center" colSpan={5}>
              <GSPViewer GSP={project.GSP} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Type of Obligation</TableCell>
            <TableCell align="center" colSpan={5}>
              {project.obligationType}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Proponent</TableCell>
            <TableCell align="center" colSpan={5}>
              {project.proponent}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Total Estimated Cost</TableCell>
            <TableCell align="center" colSpan={5}>
              {project.title}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center" rowSpan={2}>
              Investment Requirement
            </TableCell>
            <TableCell align="center">
              {`F.Y. ${project.investmentReq[0].year}`}
            </TableCell>
            <TableCell align="center">
              {`F.Y. ${project.investmentReq[1].year}`}
            </TableCell>
            <TableCell align="center">
              {`F.Y. ${project.investmentReq[2].year}`}
            </TableCell>
            <TableCell align="center">
              {`F.Y. ${project.investmentReq[3].year}`}
            </TableCell>
            <TableCell align="center">
              {`F.Y. ${project.investmentReq[4].year}`}
            </TableCell>
          </TableRow>
          <TableRow>
            {user.type === 0 && (
              <React.Fragment>
                <TableCell align="center">
                  {`Php ${project.investmentReq[0].value}`}
                </TableCell>
                <TableCell align="center">
                  {`Php ${project.investmentReq[1].value}`}
                </TableCell>
                <TableCell align="center">
                  {`Php ${project.investmentReq[2].value}`}
                </TableCell>
                <TableCell align="center">
                  {`Php ${project.investmentReq[3].value}`}
                </TableCell>
                <TableCell align="center">
                  {`Php ${project.investmentReq[4].value}`}
                </TableCell>
              </React.Fragment>
            )}
            {user.type === 1 &&
              investmentReq.map((investment, index) => (
                <TableCell align="center" key={investment.year}>
                  <TextField
                    onChange={(e) => {
                      setInvestmentReq(() => {
                        var newData = [...investmentReq]
                        newData[index].value = e.target.value;
                        return newData;
                      });
                    }}
                    label="Value"
                    variant="outlined"
                    fullWidth
                    error={false}
                    value={investment.value}
                  />
                </TableCell>
              ))}
          </TableRow>
          <TableRow>
            <TableCell align="center">Implementation Period</TableCell>
            <TableCell align="center" colSpan={5}>
              {`${startDate.toDateString()} - ${finishDate.toDateString()}`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Level of PAP Need</TableCell>
            <TableCell align="center" colSpan={5}>
              {papLevels[project.PAPLevel - 1].label}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Level of Readiness</TableCell>
            <TableCell align="center" colSpan={5}>
              {readinessLevels[project.readiness - 1].label}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Status of Implementation</TableCell>
            <TableCell align="center" colSpan={5}>
              {statuses[user.type === 0 ? project.status : status].label}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ViewerForm1;
