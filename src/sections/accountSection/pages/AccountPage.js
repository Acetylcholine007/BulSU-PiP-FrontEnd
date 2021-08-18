import { Container, Grid } from "@material-ui/core";
import React from "react";

import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import AccountModal from "../components/AccountModal";
import AccountCard from "../components/AccountCard";
import { serverUrl } from "../../../utils/serverUrl";
import { useState } from "react";
import AccountList from "../components/AccountList";

function AccountPage() {
  const {
    accountError,
    isAccountPending,
    data,
  } = useFetch(`${serverUrl}users?type=Client`);

  return (
    <React.Fragment>
      {accountError && <ErrorComponent message="Failed to fetch Accounts" />}
      {isAccountPending && <LoadingComponent />}
      {data && <AccountList data = {data} />}
    </React.Fragment>
  );
}

export default AccountPage;
