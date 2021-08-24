import {
  Container,
  Divider,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React from "react";

import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { serverUrl } from "../../../utils/serverUrl";
import AccountList from "../components/AccountList";

function AccountPage() {
  const { accountError, isAccountPending, data } = useFetch(
    `${serverUrl}users?type=0`
  );

  const useStyles = makeStyles({
    pageTitle: {
      flexGrow: 11,
    },
  });

  const classes = useStyles();

  return (
    <React.Fragment>
      {accountError && <ErrorComponent message="Failed to fetch Accounts" />}
      {isAccountPending && <LoadingComponent />}
      {data && (
        <React.Fragment>
          <Toolbar>
            <Typography variant="h4" className={classes.pageTitle}>User Account List</Typography>
          </Toolbar>
          <Divider />
          <Container>
            <AccountList data={data} />
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default AccountPage;
