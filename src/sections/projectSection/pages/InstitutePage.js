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
  Avatar,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { institutes } from "../../../utils/constants";
import { serverUrl } from "../../../utils/serverUrl";

function InstitutePage() {
  const history = useHistory();
  const [filter, setFilter] = useState({ search: "" });

  const useStyles = makeStyles((theme) => ({
    noBorder: {
      border: "none",
    },
  }));

  const classes = useStyles();

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
    <React.Fragment>
      <Toolbar>
        <Typography variant="h4" className={classes.pageTitle}>
          {"Institute List"}
        </Typography>
      </Toolbar>
      <Divider />
      <Container>
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
      </Container>
    </React.Fragment>
  );
}

export default InstitutePage;
