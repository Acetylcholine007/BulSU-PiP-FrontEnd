import React, { useEffect, useState } from "react";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Account } from "../../../utils/bulsupis_mw";
import NotificationPage from "../pages/NotificationPage";

function NotificationWrapper() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    Account.getInfo()
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <React.Fragment>
      {!user && <LoadingComponent />}
      {user && <NotificationPage user={user} />}
    </React.Fragment>
  );
}

export default NotificationWrapper;
