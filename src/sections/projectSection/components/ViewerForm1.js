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

function ViewerForm1({ project, status }) {
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
    tableTitle: {
      fontSize: 24,
      fontStyle: "Bold",
      color: "white",
      borderRight: "solid 1px",
    },
    tableTitle2: {
      fontSize: 24,
      fontStyle: "Bold",
      color: "white",
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
  const startDate = new Date(project.implementationPeriod.start);
  const finishDate = new Date(project.implementationPeriod.end);
  const { user } = useContext(AuthContext);

  const columnCalc = () =>
    project.investmentReq
      .map((item) => (parseFloat(item.value) !== 0 ? 1 : 0))
      .reduce((a, b) => a + b);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableTitle} align="center">
              Item
            </TableCell>
            <TableCell
              className={classes.tableTitle2}
              align="center"
              colSpan={columnCalc()}
            >
              Particulars
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.rowTitle} align="center">
              Project/Activity/Program Title
            </TableCell>
            <TableCell
              className={classes.rowContent}
              align="center"
              colSpan={5}
            >
              {project.title}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.rowTitle} align="center">
              GSPs
            </TableCell>
            <TableCell className={classes.rowContent} align="left" colSpan={5}>
              <GSPViewer GSP={project.GSP} />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.rowTitle} align="center">
              Type of Obligation
            </TableCell>
            <TableCell
              className={classes.rowContent}
              align="center"
              colSpan={columnCalc()}
            >
              {project.obligationType}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.rowTitle} align="center">
              Proponent
            </TableCell>
            <TableCell
              className={classes.rowContent}
              align="center"
              colSpan={columnCalc()}
            >
              {project.proponent}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.rowTitle} align="center">
              Total Estimated Cost
            </TableCell>
            <TableCell
              className={classes.rowContent}
              align="center"
              colSpan={columnCalc()}
            >
              {`Php ${project.investmentReq
                .map((item) => parseFloat(item.value))
                .reduce((a, b) => a + b)}`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.rowTitle} align="center" rowSpan={2}>
              Investment Requirement
            </TableCell>
            {project.investmentReq.map((item) =>
              parseFloat(item.value) != 0 ? (
                <TableCell className={classes.rowContent} align="center">
                  {`F.Y. ${item.year}`}
                </TableCell>
              ) : null
            )}
            {/* <TableCell className={classes.rowContent} align="center">
              {`F.Y. ${project.investmentReq[0].year}`}
            </TableCell>
            <TableCell className={classes.rowContent} align="center">
              {`F.Y. ${project.investmentReq[1].year}`}
            </TableCell>
            <TableCell className={classes.rowContent} align="center">
              {`F.Y. ${project.investmentReq[2].year}`}
            </TableCell>
            <TableCell className={classes.rowContent} align="center">
              {`F.Y. ${project.investmentReq[3].year}`}
            </TableCell>
            <TableCell className={classes.rowContent} align="center">
              {`F.Y. ${project.investmentReq[4].year}`}
            </TableCell> */}
          </TableRow>
          <TableRow>
            {project.investmentReq.map((item) =>
              parseFloat(item.value) != 0 ? (
                <TableCell className={classes.rowContent} align="center">
                  {`Php ${item.value}`}
                </TableCell>
              ) : null
            )}
            {/* <TableCell className={classes.rowContent} align="center">
              {`Php ${project.investmentReq[0].value}`}
            </TableCell>
            <TableCell className={classes.rowContent} align="center">
              {`Php ${project.investmentReq[1].value}`}
            </TableCell>
            <TableCell className={classes.rowContent} align="center">
              {`Php ${project.investmentReq[2].value}`}
            </TableCell>
            <TableCell className={classes.rowContent} align="center">
              {`Php ${project.investmentReq[3].value}`}
            </TableCell>
            <TableCell className={classes.rowContent} align="center">
              {`Php ${project.investmentReq[4].value}`}
            </TableCell> */}
          </TableRow>
          <TableRow>
            <TableCell className={classes.rowTitle} align="center">
              Implementation Period
            </TableCell>
            <TableCell
              className={classes.rowContent}
              align="center"
              colSpan={columnCalc()}
            >
              {`${startDate.toDateString()} - ${finishDate.toDateString()}`}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.rowTitle} align="center">
              Level of PAP Need
            </TableCell>
            <TableCell
              className={classes.rowContent}
              align="center"
              colSpan={columnCalc()}
            >
              {papLevels[project.PAPLevel - 1].label}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.rowTitle} align="center">
              Level of Readiness
            </TableCell>
            <TableCell
              className={classes.rowContent}
              align="center"
              colSpan={columnCalc()}
            >
              {readinessLevels[project.readiness - 1].label}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.rowTitle} align="center">
              Status of Implementation
            </TableCell>
            <TableCell
              className={classes.rowContent}
              align="center"
              colSpan={columnCalc()}
            >
              {statuses[user.type === 0 ? project.status : status].label}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ViewerForm1;
