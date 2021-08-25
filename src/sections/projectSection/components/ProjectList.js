import {
  InputAdornment,
  Table,
  TableContainer,
  Toolbar,
  TextField,
  IconButton,
  makeStyles,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { FilterList, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { statuses } from "../../../utils/constants";

function ProjectList({ projects, instituteId, filter, setFilter, setOpen }) {
  const { user } = useContext(AuthContext);

  const useStyles = makeStyles(() => ({
    noBorder: {
      border: "none",
    },
  }));

  const handleClick = (project) => {
    switch (user.type) {
      case 0:
        history.push(`/projects/${project.id}`);
        break;
      case 1:
        history.push(`/institutes/${instituteId}/${project.id}`);
        break;
      default:
        history.push(`*`);
        break;
    }
  };

  const filterLogic = (project) => {
    var investmentFilterPassed = true;
    var projectCostFilterPassed = true;
    var statusFilterPassed = true;
    var searchFilterPassed = true;

    if(filter.investmentReq.enabled) {
      var sum = project.investmentReq.map((item) => parseFloat(item.value)).reduce((a, b) => a + b, 0)
      investmentFilterPassed = sum >= filter.investmentReq.value[0] * 1000000 && sum <= filter.investmentReq.value[1] * 1000000;
    }

    if(filter.projectCost.enabled) {
      var sum = project.proposedProjectCost.map((item) => parseFloat(item.cost)).reduce((a, b) => a + b, 0)
      projectCostFilterPassed = sum >= filter.projectCost.value[0] * 1000000 && sum <= filter.projectCost.value[1] * 1000000;
    }

    if(filter.status.enabled) {
      statusFilterPassed = filter.status.values[project.status];
    }

    if(filter.search !== '') {
      searchFilterPassed = project.title.toLowerCase().includes(filter.search.toLowerCase())
    }

    return investmentFilterPassed && projectCostFilterPassed && statusFilterPassed && searchFilterPassed;
  }

  const classes = useStyles();
  const history = useHistory();
  const [filteredProject, setFilteredProject] = useState(projects.filter(filterLogic))
  useEffect(() => {
    setFilteredProject(projects.filter(filterLogic));
  }, [filter])

  return (
    <Paper>
      <Toolbar>
        <TextField
          placeholder="Search"
          fullWidth
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
            classes: { notchedOutline: classes.noBorder },
          }}
          variant="outlined"
          className={classes.searchBox}
          color="secondary"
        />
        <IconButton onClick = {() => setOpen(true)}>
          <FilterList />
        </IconButton>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Priority</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Proponent</TableCell>
              <TableCell>Total Investment Requirement</TableCell>
              <TableCell>Total Project Cost</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProject.map((project) => (
              <TableRow
                hover
                style={{ backgroundColor: statuses[project.status].color }}
                key={project.id}
                onClick={() => handleClick(project)}
              >
                <TableCell>{project.priority}</TableCell>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.proponent}</TableCell>
                <TableCell>{`Php ${project.investmentReq
                  .map((item) => parseFloat(item.value))
                  .reduce((a, b) => a + b, 0)}`}</TableCell>
                <TableCell>{`Php ${project.proposedProjectCost
                  .map((item) => parseFloat(item.cost))
                  .reduce((a, b) => a + b, 0)}`}</TableCell>
                <TableCell>{statuses[project.status].label}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ProjectList;
