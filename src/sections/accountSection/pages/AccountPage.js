import {
  Container,
  Divider,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Admin } from "../../../utils/bulsupis_mw";
import { serverUrl } from "../../../utils/serverUrl";
import AccountFilterDialog from "../components/AccountFilterDialog";
import AccountList from "../components/AccountList";

function AccountPage() {
  const [open, setOpen] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);
  const [users, setUsers] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    verified: { enabled: false, value: 1 },
  });
  // const {
  //   accountError,
  //   isAccountPending,
  //   data: users,
  // } = useFetch(`${serverUrl}users?type=0`);

  const useStyles = makeStyles({
    pageTitle: {
      flexGrow: 11,
    },
    divider: {
      marginBottom: 15
    }
  });

  const classes = useStyles();

  useEffect(() => {
    Admin.Account.getAll()
    .then((res) => {
      console.log(res.data)
      setUsers(res.data)
    })
    .catch((err) => {
      console.log(err.message)
    })
  }, [])

  return (
    <React.Fragment>
      {!users && <LoadingComponent />}
      {users && (
        <React.Fragment>
          <Toolbar>
            <Typography variant="h4" className={classes.pageTitle}>
              User Account List
            </Typography>
          </Toolbar>
          <Divider classes={{root: classes.divider}}/>
          <Container>
            <Grid container>
              <Grid item xs={12}>
                <AccountList
                  users={users}
                  filter={filter}
                  setFilter={setFilter}
                  setOpen={setOpen}
                  setDataChanged={setDataChanged}
                />
              </Grid>
            </Grid>
            <AccountFilterDialog
              open={open}
              setOpen={setOpen}
              filter={filter}
              setFilter={setFilter}
            />
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default AccountPage;
