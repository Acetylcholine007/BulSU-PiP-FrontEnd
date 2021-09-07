import React, { useEffect, useState } from "react";
import App from "./App";
import LoadingComponent from "./shared/components/LoadingComponent";
import { Account } from "./utils/bulsupis_mw";

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    Account.isLoggedIn()
      .then((res) => {
        setIsLoggedIn(res);
      })
      .catch((err) => console.log(err.message));
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      {isLoggedIn == null && <LoadingComponent />}
      {isLoggedIn !== null && (
        <App isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </React.Fragment>
  );
}

export default AppWrapper;
