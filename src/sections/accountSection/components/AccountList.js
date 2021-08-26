import {
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
} from "@material-ui/core";
import { FilterList, Search } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { serverUrl } from "../../../utils/serverUrl";
import AccountModal from "./AccountModal";

function AccountList({ users, filter, setFilter, setOpen, setDataChanged }) {
  const [user, setUser] = useState(null);
  const [openUserModal, setOpenUserModal] = useState(false);
  
  const useStyles = makeStyles(() => ({
    noBorder: {
      border: "none",
    },
    searchBox: {
      background: "#D3D3D3"
    }
  }));

  const filterLogic = (user) => {
    var statusFilterPassed = true;
    var searchFilterPassed = true;

    if (filter.verified.enabled) {
      statusFilterPassed = user.verified == filter.verified.value
    }

    if (filter.search !== "") {
      searchFilterPassed = user.institute.institute
        .toLowerCase()
        .includes(filter.search.toLowerCase());
    }

    return statusFilterPassed && searchFilterPassed;
  };

  const selectUser = (user) => {
    setUser(user);
    setOpenUserModal(true);
  };

  const classes = useStyles();
  const [filteredUser, setFilteredUser] = useState(users.filter(filterLogic));

  useEffect(() => {
    setFilteredUser(users.filter(filterLogic));
  }, [filter]);

  const handleToggle = (user) => {
    fetch(`${serverUrl}users/${user.id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        ...user,
        verified: !user.verified,
      }),
    }).then(() => {
      setDataChanged(true);
    });
  };

  const handleDelete = (user) => {
    fetch(`${serverUrl}users/${user.id}`, {
      method: "DELETE"
    }).then(() => {
      setDataChanged(true);
    });
  }

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
        <IconButton onClick={() => setOpen(true)}>
          <FilterList />
        </IconButton>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User Institute</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUser.map((user) => (
              <TableRow
                hover
                onClick={(e) => {
                  selectUser(user);
                }}
                key={user.id}
              >
                <TableCell>{user.institute.institute}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.verified ? "Verified" : "Pending"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {user && (
        <AccountModal
          user={user}
          open={openUserModal}
          setOpen={setOpenUserModal}
          handleToggle={handleToggle}
          handleDelete={handleDelete}
        />
      )}
    </Paper>
  );
}

export default AccountList;
