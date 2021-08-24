import {
  Container,
  Divider,
  Paper,
  Toolbar,
  Typography,
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { ProjectContext } from "../../../contexts/ProjectContext";
import { institutes } from "../../../utils/constants";

function InstitutePage() {
  const { projects } = useContext(ProjectContext);
  const [filter, setFilter] = useState({ search: "" });
  const [filteredProject, setFilteredProject] = useState(projects);
  useEffect(() => {
    setFilteredProject(
      filter.search === ""
        ? projects
        : projects.filter((project) =>
            project.title.toLowerCase().includes(filter.search.toLowerCase())
          )
    );
  }, [filter, projects]);
  const useStyles = makeStyles((theme) => ({
    noBorder: {
      border: "none",
    },
  }));

  const classes = useStyles();
  const history = useHistory();

  return (
    <React.Fragment>
      <Toolbar>
        <Typography variant="h4" className={classes.pageTitle}>
          {"Institute List"}
        </Typography>
      </Toolbar>
      <Divider />
      <Container>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="spanning table">
            <TableHead style={{backgroundColor: '#535353'}}>
              <TextField
                placeholder="Search"
                fullWidth
                value={filter.search}
                onChange={(e) =>
                  setFilter({ ...filter, search: e.target.value })
                }
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
            </TableHead>
            <TableBody>
              {institutes.slice(0, institutes.length - 2).map((institute) => (
                <TableRow
                  hover
                  onClick={(e) => {
                    history.push(`/institutes/${institute.abbv}`);
                  }}
                  key={institute.abbv}
                >
                  <TableCell>{institute.institute}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </React.Fragment>
  );
}

export default InstitutePage;
