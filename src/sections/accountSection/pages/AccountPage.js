import {
  Container,
  Divider,
  Grid,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";

import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { serverUrl } from "../../../utils/serverUrl";
import AccountFilterDialog from "../components/AccountFilterDialog";
import AccountList from "../components/AccountList";

function AccountPage() {
  const [open, setOpen] = useState(false);
  const [dataChanged, setDataChanged] = useState(false);
  const [filter, setFilter] = useState({
    search: "",
    verified: { enabled: false, value: 1 },
  });
  const {
    accountError,
    isAccountPending,
    data: users,
  } = useFetch(`${serverUrl}users?type=0`);

  const useStyles = makeStyles({
    pageTitle: {
      flexGrow: 11,
    },
    divider: {
      marginBottom: 15
    }
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      {accountError && <ErrorComponent message="Failed to fetch Accounts" />}
      {isAccountPending && <LoadingComponent />}
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
