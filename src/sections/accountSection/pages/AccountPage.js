import { Container, Grid } from "@material-ui/core";
import React from "react";

import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import AccountModal from "../components/AccountModal";
import AccountCard from "../components/AccountCard";
import { serverUrl } from "../../../utils/serverUrl";
import { useState } from "react";

function AccountPage() {
  const {
    accountError,
    isAccountPending,
    data: accounts,
  } = useFetch(`${serverUrl}users?type=Client`);
  const [open, setOpen] = useState(false);
  const [account, setAccount] = useState(null);

  const selectAccount = (account) => {
    setAccount(account);
    setOpen(true);
  };

  return (
    <React.Fragment>
      {accountError && <ErrorComponent message="Failed to fetch Accounts" />}
      {isAccountPending && <LoadingComponent />}
      {accounts && (
        <Container>
          <Grid container spacing={2}>
            {accounts.map((account) => (
              <Grid item xs={12} md={4}>
                <AccountCard user={account} selectAccount={selectAccount} />
              </Grid>
            ))}
          </Grid>
          {account && <AccountModal open={open} setOpen={setOpen} account={account} />}
        </Container>
      )}
    </React.Fragment>
  );
}

export default AccountPage;
