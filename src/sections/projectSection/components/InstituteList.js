import {
    Avatar,
  InputAdornment,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  Toolbar,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { institutes } from "../../../utils/constants";
import { serverUrl } from "../../../utils/serverUrl";

function InstituteList({ filter, setFilter }) {
  const useStyles = makeStyles((theme) => ({
    noBorder: {
      border: "none",
    },
    searchBox: {
      background: "#D3D3D3"
    }
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
    institutes.slice(0, institutes.length - 2).filter(filterLogic)
  );

  useEffect(() => {
    setFilteredInstitute(
      institutes.slice(0, institutes.length - 2).filter(filterLogic)
    );
  }, [filter]);

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
            className: classes.searchBox
          }}
          variant="outlined"
          color="secondary"
          size='small'
          margin='dense'
        />
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
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
                  history.push(`/institutes/${institute.abbv}`);
                }}
                key={institute.abbv}
              >
                <TableCell>
                  <Avatar src={`${serverUrl}logos/${institute.abbv}.png`} />
                </TableCell>
                <TableCell>{institute.institute}</TableCell>
                <TableCell align="center">{0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default InstituteList;
