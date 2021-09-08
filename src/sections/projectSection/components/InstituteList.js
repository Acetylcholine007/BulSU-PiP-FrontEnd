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
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { InstituteContext } from "../../../contexts/InstituteContext";

function InstituteList({ filter, setFilter, institutes }) {
  const { setInstitute } = useContext(InstituteContext);

  const newInstitutes = institutes.map((item, index) => ({
    ...item,
    institute: institutes[index].institute,
  }));

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
    setInstitute(null);
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
              <TableCell styles={{ padding: 0, width: "10%" }} align = 'center'>Logo</TableCell>
              <TableCell>Institute</TableCell>
              <TableCell align="center">Projects</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredInstitute.map((institute) => (
              <TableRow
                hover
                onClick={(e) => {
                  setInstitute(institute);
                  history.push(`/institutes/${institute.id}`);
                }}
                key={institute.abbv}
              >
                <TableCell style={{ width: "10%" }} align = 'center'>
                  <Avatar src={institute.profile_img.src} />
                </TableCell>
                <TableCell>{institute.institute}</TableCell>
                <TableCell align="center">
                  {institute.project_list.length}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}

export default InstituteList;
