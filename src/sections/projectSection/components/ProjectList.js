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
import { FilterList, Reorder, Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { statuses } from "../../../utils/constants";

function ProjectList({ institute, instituteId, filter, setFilter, setOpen }) {
  const { user } = useContext(AuthContext);

  const useStyles = makeStyles(() => ({
    noBorder: {
      border: "none",
    },
    searchBox: {
      background: "#D3D3D3",
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

    if (filter.investmentReq.enabled) {
      var sum = project.investmentReq
        .map((item) => parseFloat(item.value))
        .reduce((a, b) => a + b, 0);
      investmentFilterPassed =
        sum >= filter.investmentReq.value[0] * 1000000 &&
        sum <= filter.investmentReq.value[1] * 1000000;
    }

    if (filter.projectCost.enabled) {
      var sum = project.proposedProjectCost
        .map((item) => parseFloat(item.cost))
        .reduce((a, b) => a + b, 0);
      projectCostFilterPassed =
        sum >= filter.projectCost.value[0] * 1000000 &&
        sum <= filter.projectCost.value[1] * 1000000;
    }

    if (filter.status.enabled) {
      statusFilterPassed = filter.status.values[project.status];
    }

    if (filter.search !== "") {
      searchFilterPassed = project.title
        .toLowerCase()
        .includes(filter.search.toLowerCase());
    }

    return (
      investmentFilterPassed &&
      projectCostFilterPassed &&
      statusFilterPassed &&
      searchFilterPassed
    );
  };

  const classes = useStyles();
  const history = useHistory();
  const [filteredProject, setFilteredProject] = useState(
    institute.projects.filter(filterLogic)
  );
  useEffect(() => {
    setFilteredProject(institute.projects.filter(filterLogic));
  }, [filter]);

  const onDragEnd = (result) => {
    const {destination, source, draggableId} = result;

    if(!destination) {
      return;
    }

    if(
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    setFilteredProject(() => {
      const newData = [...filteredProject];
      const target = newData.splice(source.index, 1)[0];
      newData.splice(destination.index, 0, target);
      return newData;
    })
  };

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
            className: classes.searchBox,
          }}
          variant="outlined"
          color="secondary"
          size="small"
          margin="dense"
        />
        <IconButton onClick={() => setOpen(true)}>
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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="vertical">
              {(provided) => (
                <TableBody
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {filteredProject.map((project, index) => (
                    <Draggable
                      key={project.id.toString()}
                      draggableId={project.id.toString()}
                      index={index}
                    >
                      {(provided) => {
                        return (
                          <TableRow
                            innerRef={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            hover
                            style={{
                              ...provided.draggableProps.style,
                              backgroundColor: statuses[project.status].color,
                            }}
                            key={project.id}
                            onClick={() => handleClick(project)}
                          >
                            <TableCell>{institute.priority.indexOf(project.id) + 1}</TableCell>
                            <TableCell>{project.title}</TableCell>
                            <TableCell>{project.proponent}</TableCell>
                            <TableCell>{`Php ${project.investmentReq
                              .map((item) => parseFloat(item.value))
                              .reduce((a, b) => a + b, 0)}`}</TableCell>
                            <TableCell>{`Php ${project.proposedProjectCost
                              .map((item) => parseFloat(item.cost))
                              .reduce((a, b) => a + b, 0)}`}</TableCell>
                            <TableCell>
                              {statuses[project.status].label}
                            </TableCell>
                          </TableRow>
                        );
                      }}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </TableBody>
              )}
            </Droppable>
          </DragDropContext>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default ProjectList;
