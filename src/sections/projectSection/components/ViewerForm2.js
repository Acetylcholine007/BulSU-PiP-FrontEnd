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
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import { months } from "../../../utils/constants";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Folder, GetApp } from "@material-ui/icons";

function ViewerForm2({
  project,
  proposedProjectCost,
  setProposedProjectCost,
  checkerForm2,
}) {
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
        <Table className={classes.table} aria-label="spanning table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableTitle} align="center">
                Item
              </TableCell>
              <TableCell
                className={classes.tableTitle2}
                align="center"
                colSpan={4}
              >
                Particulars
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Name of SUC
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={4}
              >
                {project.suc}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                College/Campus/Office
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={4}
              >
                {project.institute.institute}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Address
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={4}
              >
                {project.address}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Project Title
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={4}
              >
                {project.title}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Location of Project
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={4}
              >
                {project.projectLocation}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Priority Ranking
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={4}
              >
                {project.priority}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={classes.rowTitle}
                align="center"
                rowSpan={2}
              >
                Categorization
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                New
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                <Checkbox checked={project.categorization.new} />
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                Infrastructure
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                <Checkbox checked={project.categorization.infrastructure} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowContent} align="center">
                Expanded/Revised
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                <Checkbox checked={project.categorization.expanded} />
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                Non-infrastructure
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                <Checkbox checked={project.categorization.nonInfrastructure} />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Description
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={5}
              >
                {project.description}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Purpose
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={5}
              >
                {project.purpose}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Beneficiaries
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={5}
              >
                {project.beneficiaries}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={classes.rowTitle}
                align="center"
                rowSpan={2}
              >
                Implementation Period
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                Start Date
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {months[startDate.getMonth()]}
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {startDate.getDate()}
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {startDate.getFullYear()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowContent} align="center">
                Finish Date
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {months[finishDate.getMonth()]}
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {finishDate.getDate()}
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {finishDate.getFullYear()}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={classes.rowTitle}
                align="center"
                rowSpan={2}
              >
                Proposed Project Cost
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {`F.Y. ${project.proposedProjectCost[0].year}`}
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {`F.Y. ${project.proposedProjectCost[1].year}`}
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {`F.Y. ${project.proposedProjectCost[2].year}`}
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                TOTAL
              </TableCell>
            </TableRow>
            <TableRow>
              {user.type === 0 && (
                <React.Fragment>
                  <TableCell className={classes.rowContent} align="center">
                    {`Php ${project.proposedProjectCost[0].cost}`}
                  </TableCell>
                  <TableCell className={classes.rowContent} align="center">
                    {`Php ${project.proposedProjectCost[1].cost}`}
                  </TableCell>
                  <TableCell className={classes.rowContent} align="center">
                    {`Php ${project.proposedProjectCost[2].cost}`}
                  </TableCell>
                  <TableCell
                    className={classes.rowContent}
                    align="center"
                  >{`Php ${totalCost}`}</TableCell>
                </React.Fragment>
              )}
              {user.type === 2 && (
                <React.Fragment>
                  {proposedProjectCost.map((yearCost, index) => (
                    <TableCell
                      className={classes.rowContent}
                      align="center"
                      key={yearCost.year}
                    >
                      <TextField
                        onChange={(e) => {
                          setProposedProjectCost(() => {
                            var newData = [...proposedProjectCost];
                            newData[index].cost = e.target.value;
                            return newData;
                          });
                        }}
                        label="Value"
                        variant="outlined"
                        fullWidth
                        error={checkerForm2.proposedProjectCost[index].error}
                        helperText={
                          checkerForm2.proposedProjectCost[index].error
                            ? checkerForm2.proposedProjectCost[index]
                                .messages[0]
                            : null
                        }
                        value={yearCost.cost}
                        InputProps={{ className: classes.textField }}
                        InputLabelProps={{ className: classes.textField }}
                      />
                    </TableCell>
                  ))}
                  <TableCell
                    className={classes.rowContent}
                    align="center"
                  >{`Php ${totalCost}`}</TableCell>
                </React.Fragment>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      
      <Divider classes={{ root: classes.divider }} />
      
    
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="spanning table">
          <TableBody>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Name of Proponent
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {project.proponentName.surname}
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {project.proponentName.firstName}
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {project.proponentName.middleInitial}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Designation
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={3}
              >
                {project.designation}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                className={classes.rowTitle}
                align="center"
                rowSpan={2}
              >
                Contact Information
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {project.contactInformation.telNumber}
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={2}
              >
                {project.contactInformation.email}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowContent} align="center">
                {project.contactInformation.phoneNumber}
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={2}
              >
                {project.contactInformation.others}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Date Accomplished
              </TableCell>
              <TableCell className={classes.rowContent} align="center">
                {accomplishedDate.toDateString()}
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={2}
              >
                {project.signature && (
                  <img src={project.signature.src} height={100} />
                )}
                {!project.signature && "No Signature"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.rowTitle} align="center">
                Attached Files
              </TableCell>
              <TableCell
                className={classes.rowContent}
                align="center"
                colSpan={3}
              >
                <List>
                  {project.fileList.map((file, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar>
                          <Folder />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={file.metadata.originalname} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          onClick={() => window.open(file.src, "_blank")}
                          style={{ color: "white" }}
                        >
                          <GetApp />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default ViewerForm2;