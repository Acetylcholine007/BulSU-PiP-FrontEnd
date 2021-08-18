import { Container, Grid } from "@material-ui/core";
import React from "react";
import { useState } from "react";

import AccountCard from "./AccountCard";
import AccountModal from "./AccountModal";

function AccountList({ data }) {
  const [accounts, setAccounts] = useState(data);
  const [account, setAccount] = useState(null);
  const [open, setOpen] = useState(false);
  const selectAccount = (account) => {
    setAccount(account);
    setOpen(true);
  };
  return (
    <Container>
      <Grid container spacing={2}>
        {accounts.map((account) => (
          <Grid item xs={12} md={4} key={account.id}>
            <AccountCard
              user={account}
              selectAccount={selectAccount}
              setAccounts={setAccounts}
              accounts={accounts}
            />
          </Grid>
        ))}
      </Grid>
      {account && (
        <AccountModal
          open={open}
          setOpen={setOpen}
          user={account}
          setAccounts={setAccounts}
          accounts={accounts}
        />
      )}
    </Container>
  );
}

export default AccountList;
