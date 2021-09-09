import React, { useEffect, useState } from "react";
import ErrorComponent from "../../../shared/components/ErrorComponent";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Account } from "../../../utils/bulsupis_mw";
import NotificationPage from "../pages/NotificationPage";

function NotificationWrapper() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Account.getInfo()
      .then(({ simple, full }) => {
        if (simple) {
          setUser(simple.data);
        } else {
          setUser(simple);
          setError(full);
        }
      })
      .catch((err) => setError(err.message));
  }, []);

  return (
    <React.Fragment>
      {user == null && <LoadingComponent />}
      {error && <ErrorComponent message={error} />}
      {user !== null && !error && <NotificationPage user={user} />}
    </React.Fragment>
  );
}

export default NotificationWrapper;
