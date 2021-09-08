import React, { useEffect, useState } from "react";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Admin } from "../../../utils/bulsupis_mw";
import AccountPage from "../pages/AccountPage";

function AccountsWrapper() {
  const [users, setUsers] = useState(null);
  const [dataChanged, setDataChanged] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    Admin.Account.getAll()
      .then(({ simple, full }) => {
        if (simple) {
          setUsers(simple.data);
        } else {
          setUsers(simple);
          setError(full);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [dataChanged]);

  return (
    <React.Fragment>
      {users == null && <LoadingComponent />}
      {error && <ErrorComponent message={error} />}
      {users !== null && !error && (
        <AccountPage
          serverUsers={users}
          dataChanged={dataChanged}
          setDataChanged={setDataChanged}
        />
      )}
    </React.Fragment>
  );
}

export default AccountsWrapper;
