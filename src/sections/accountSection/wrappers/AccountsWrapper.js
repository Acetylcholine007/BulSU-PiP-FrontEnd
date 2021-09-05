import React, { useEffect, useState } from "react";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Admin } from "../../../utils/bulsupis_mw";
import AccountPage from "../pages/AccountPage";

function AccountsWrapper() {
  const [users, setUsers] = useState(null);
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    Admin.Account.getAll()
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [dataChanged]);

  return (
    <React.Fragment>
      {!users && <LoadingComponent />}
      {users && (
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
