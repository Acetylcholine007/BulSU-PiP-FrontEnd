import {
  Card,
  IconButton,
  InputAdornment,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
} from "@material-ui/core";
import {
  Block,
  Delete,
  FilterList,
  Search,
  VerifiedUser,
} from "@material-ui/icons";
import React, { useState, useEffect, useContext } from "react";
import { Admin } from "../../../utils/bulsupis_mw";
import AccountModal from "./AccountModal";
import { SnackbarContext } from "../../../contexts/SnackbarContext";
import EmptyTableContent from "../../../shared/components/EmptyTableContent";

function AccountList({
  users,
  setUsers,
  filter,
  setFilter,
  setOpen,
  setDataChanged,
}) {
  const [user, setUser] = useState(null);
  const [openUserModal, setOpenUserModal] = useState(false);
  const { setShowSnackbar, setSnackbarData } = useContext(SnackbarContext);

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

  const filterLogic = (user) => {
    var statusFilterPassed = true;
    var searchFilterPassed = true;

    if (filter.verified.enabled) {
      statusFilterPassed = user.verified == filter.verified.value;
    }

    if (filter.search !== "") {
      searchFilterPassed = user.email
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
  }, [filter, users]);

  const handleToggle = (user) => {
    Admin.Account.setVerification(user.id, !user.verified)
      .then(({ simple, full }) => {
        if (simple) {
          setSnackbarData({
            type: 0,
            message: "Account status changed",
          });
          setUsers(() => {
            let newUsers = [...users];
            newUsers.find((item) => item.id === user.id).verified =
              !user.verified;
            return newUsers;
          });
        } else {
          console.log(full);
          setSnackbarData({
            type: 3,
            message: full,
          });
        }
      })
      .catch((err) =>
        setSnackbarData({
          type: 3,
          message: err.message,
        })
      )
      .finally(() => setShowSnackbar(true));
  };

  const handleDelete = (user) => {
    Admin.Account.delete(user.id)
      .then(({ simple, full }) => {
        if (simple) {
          setSnackbarData({
            type: 0,
            message: "Account deleted",
          });
          setUsers(() => {
            let newUsers = [...users];
            newUsers.splice(
              newUsers.findIndex((item) => item.id === user.id),
              1
            );
            return newUsers;
          });
        } else {
          console.log(full);
          setSnackbarData({
            type: 3,
            message: full,
          });
        }
      })
      .catch((err) =>
        setSnackbarData({
          type: 3,
          message: err.message,
        })
      )
      .finally(() => setShowSnackbar(true));
  };

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
        <IconButton onClick={() => setOpen(true)}>
          <FilterList />
        </IconButton>
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow>
              <TableCell>Email Address</TableCell>
              <TableCell>User Institute</TableCell>
              <TableCell>Status</TableCell>
              <TableCell style={{ padding: 0, width: "10%" }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUser.length == 0 && (
              <EmptyTableContent message="No available accounts" span={4} />
            )}
            {filteredUser.length !== 0 &&
              filteredUser.map((user) => (
                <TableRow hover key={user.id}>
                  <TableCell
                    onClick={(e) => {
                      selectUser(user);
                    }}
                  >
                    {user.email}
                  </TableCell>
                  <TableCell
                    onClick={(e) => {
                      selectUser(user);
                    }}
                  >
                    {user.institute.institute}
                  </TableCell>
                  <TableCell
                    onClick={(e) => {
                      selectUser(user);
                    }}
                  >
                    {user.verified ? "Verified" : "Pending"}
                  </TableCell>
                  <TableCell style={{ padding: 0 }} align="center">
                    <IconButton onClick={() => handleToggle(user)}>
                      {user.verified ? (
                        <VerifiedUser style={{ color: "#4caf50" }} />
                      ) : (
                        <Block style={{ color: "#ff9800" }} />
                      )}
                    </IconButton>
                    <IconButton onClick={() => handleDelete(user)}>
                      <Delete style={{ color: "#f44336" }} />
                    </IconButton>
                  </TableCell>
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
    </Card>
  );
}

export default AccountList;
