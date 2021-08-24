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
  TextField,
} from "@material-ui/core";
import { months } from "../../../utils/constants";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

function ViewerForm2({ project, proposedProjectCost, setProposedProjectCost }) {
  const useStyles = makeStyles(() => ({
    table: {
      minWidth: 700,
    },
    divider: {
      margin: "20px 0px 20px 0px",
    },
  }));
  const classes = useStyles();
  const startDate = new Date(project.implementationPeriod.start);
  const finishDate = new Date(project.implementationPeriod.end);
  const accomplishedDate = new Date(project.dateAccomplished);
  const { user } = useContext(AuthContext);
  const totalCost = (
    user.type === 0 ? project.proposedProjectCost : proposedProjectCost
  )
    .map((project) => parseFloat(project.cost))
    .reduce((a, b) => a + b, 0);

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table classname={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center" colSpan={4}>
                Particulars
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">Name of SUC</TableCell>
              <TableCell align="center" colSpan={4}>
                {project.suc}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">College/Campus/Office</TableCell>
              <TableCell align="center" colSpan={4}>
                {project.institute.institute}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Address</TableCell>
              <TableCell align="center" colSpan={4}>
                {project.address}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Project Title</TableCell>
              <TableCell align="center" colSpan={4}>
                {project.title}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Location of Project</TableCell>
              <TableCell align="center" colSpan={4}>
                {project.projectLocation}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Priorit Ranking</TableCell>
              <TableCell align="center" colSpan={4}>
                {project.priority}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                Categorization
              </TableCell>
              <TableCell align="center">New</TableCell>
              <TableCell align="center">
                <Checkbox checked={project.categorization.new} />
              </TableCell>
              <TableCell align="center">Infrastructure</TableCell>
              <TableCell align="center">
                <Checkbox checked={project.categorization.infrastructure} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Expanded/Revised</TableCell>
              <TableCell align="center">
                <Checkbox checked={project.categorization.expanded} />
              </TableCell>
              <TableCell align="center">Non-infrastructure</TableCell>
              <TableCell align="center">
                <Checkbox checked={project.categorization.nonInfrastructure} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center" colSpan={5}>
                {project.description}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Purpose</TableCell>
              <TableCell align="center" colSpan={5}>
                {project.purpose}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Beneficiaries</TableCell>
              <TableCell align="center" colSpan={5}>
                {project.beneficiary}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                Implementation Period
              </TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">
                {months[startDate.getMonth()]}
              </TableCell>
              <TableCell align="center">{startDate.getDate()}</TableCell>
              <TableCell align="center">{startDate.getFullYear()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Finish Date</TableCell>
              <TableCell align="center">
                {months[finishDate.getMonth()]}
              </TableCell>
              <TableCell align="center">{finishDate.getDate()}</TableCell>
              <TableCell align="center">{finishDate.getFullYear()}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                Proposed Project Cost
              </TableCell>
              <TableCell align="center">
                {`F.Y. ${project.proposedProjectCost[0].year}`}
              </TableCell>
              <TableCell align="center">
                {`F.Y. ${project.proposedProjectCost[1].year}`}
              </TableCell>
              <TableCell align="center">
                {`F.Y. ${project.proposedProjectCost[2].year}`}
              </TableCell>
              <TableCell align="center">TOTAL</TableCell>
            </TableRow>
            <TableRow>
              {user.type === 0 && (
                <React.Fragment>
                  <TableCell align="center">
                    {`Php ${project.proposedProjectCost[0].cost}`}
                  </TableCell>
                  <TableCell align="center">
                    {`Php ${project.proposedProjectCost[1].cost}`}
                  </TableCell>
                  <TableCell align="center">
                    {`Php ${project.proposedProjectCost[2].cost}`}
                  </TableCell>
                  <TableCell align="center">{`Php ${totalCost}`}</TableCell>
                </React.Fragment>
              )}
              {user.type === 1 && (
                <React.Fragment>
                  {proposedProjectCost.map((yearCost, index) => (
                    <TableCell align="center" key = {yearCost.year}>
                      <TextField
                        onChange={(e) => {
                          setProposedProjectCost(() => {
                            var newData = [...proposedProjectCost]
                            newData[index].cost = e.target.value;
                            return newData;
                          });
                        }}
                        label="Value"
                        variant="outlined"
                        fullWidth
                        error={false}
                        value={yearCost.cost}
                      />
                    </TableCell>
                  ))}
                  <TableCell align="center">{`Php ${totalCost}`}</TableCell>
                </React.Fragment>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Divider classes={{ root: classes.divider }} />
      <TableContainer component={Paper}>
        <Table classname={classes.table} aria-label="spanning table">
          <TableBody>
            <TableRow>
              <TableCell align="center">Name of Proponent</TableCell>
              <TableCell align="center">
                {project.proponentName.surname}
              </TableCell>
              <TableCell align="center">
                {project.proponentName.firstName}
              </TableCell>
              <TableCell align="center">
                {project.proponentName.middleInitial}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Designation</TableCell>
              <TableCell align="center" colSpan={3}>
                {project.designation}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" rowSpan={2}>
                Contact Information
              </TableCell>
              <TableCell align="center">
                {project.contactInformation.telNumber}
              </TableCell>
              <TableCell align="center" colSpan={2}>
                {project.contactInformation.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">
                {project.contactInformation.phoneNumber}
              </TableCell>
              <TableCell align="center" colSpan={2}>
                {project.contactInformation.others}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Date Accomplished</TableCell>
              <TableCell align="center">
                {accomplishedDate.toDateString()}
              </TableCell>
              <TableCell align="center" colSpan={2}>
                Signature Here
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default ViewerForm2;
