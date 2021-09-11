import React, { useEffect, useState } from "react";
import App from "./App";
import LoadingPage from "./shared/pages/LoadingPage";
import { Account } from "./utils/bulsupis_mw";
import ErrorPage from "./shared/pages/ErrorPage";

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
        }
      })
      .catch((err) => {
        setIsLoggedIn(false);
        setError(err.message);
      });
  }, [isLoggedIn]);

  return (
    <React.Fragment>
      {isLoggedIn == null && <LoadingPage />}
      {error && <ErrorPage message={error} />}
      {isLoggedIn !== null && !error && (
        <App isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      )}
    </React.Fragment>
  );
}

export default AppWrapper;
