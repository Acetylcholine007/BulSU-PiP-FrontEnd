import {
  Avatar,
  InputAdornment,
  makeStyles,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Toolbar,
  Card,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { institutes } from "../../../utils/constants";
import { serverUrl } from "../../../utils/serverUrl";

function InstituteList({ filter, setFilter, dabaseInstitutes }) {
  const newInstitutes = dabaseInstitutes.map((item, index) => ({...item, institute: institutes[index].institute}))

  const useStyles = makeStyles((theme) => ({
    noBorder: {
      border: "none",
    },
    searchBox: {
      background: theme.palette.tertiary.light,
    },
    toolbar: {
      background: theme.palette.tertiary.main,
    },
    tableHead: {
      background: theme.palette.tertiary.main,
    },
  }));

  const classes = useStyles();
  const history = useHistory();

  const filterLogic = (institute) => {
    var searchFilterPassed = true;

    if (filter.search !== "") {
      searchFilterPassed = institute.institute
        .toLowerCase()
        .includes(filter.search.toLowerCase());
    }

    return searchFilterPassed;
  };

  const [filteredInstitute, setFilteredInstitute] = useState(
    newInstitutes.slice(0, newInstitutes.length - 2).filter(filterLogic)
  );

  useEffect(() => {
    setFilteredInstitute(
      newInstitutes.slice(0, newInstitutes.length - 2).filter(filterLogic)
    );
  }, [filter]);

  return (
    <Card>
      <Toolbar className={classes.toolbar}>
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
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Logo</TableCell>
              <TableCell>Institute</TableCell>
              <TableCell align="center">Projects</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInstitute.map((institute) => (
              <TableRow
                hover
                onClick={(e) => {
                  history.push(`/institutes/${institute.id}`);
                }}
                key={institute.abbv}
              >
                <TableCell>
                  <Avatar src={`${serverUrl}logos/${institute.id}.png`} />
                </TableCell>
                <TableCell>{institute.institute}</TableCell>
                <TableCell align="center">{institute.projects.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default InstituteList;
