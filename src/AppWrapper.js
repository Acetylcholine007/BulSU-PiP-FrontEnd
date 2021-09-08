import React, { useEffect, useState } from "react";
import App from "./App";
import LoadingComponent from "./shared/components/LoadingComponent";
import ErrorComponent from "./shared/components/ErrorComponent";
import { Account } from "./utils/bulsupis_mw";

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Account.isLoggedIn()
      .then(({ simple, full }) => {
        if (simple) {
          setIsLoggedIn(simple);
        } else {
          setIsLoggedIn(false);
          setError(full);
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setError(err.message);
      });
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      {isLoggedIn == null && <LoadingComponent />}
      {error && <ErrorComponent message={error} />}
      {isLoggedIn !== null && !error && (
        <App isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </React.Fragment>
  );
}

export default AppWrapper;
