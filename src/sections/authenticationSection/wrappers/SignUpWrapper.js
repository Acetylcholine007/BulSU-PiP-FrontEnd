import React, { useEffect, useState } from "react";
import ErrorPage from "../../../shared/pages/ErrorPage";
import LoadingPage from "../../../shared/pages/LoadingPage";
import { Institute } from "../../../utils/bulsupis_mw";
import SignUpPage from "../pages/SignUpPage";

function SignUpWrapper() {
  const [institutes, setInstitutes] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Institute.get()
      .then(({ simple, full }) => {
        if (simple) {
          console.log(simple)
          setInstitutes(simple.data.map((item) => item.institute));
        } else {
          setInstitutes(simple);
          setError(full);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <React.Fragment>
      {institutes == null && <LoadingPage />}
      {error && <ErrorPage message={error} />}
      {institutes !== null && !error && (
        <SignUpPage institutes={institutes} />
      )}
    </React.Fragment>
  );
}

export default SignUpWrapper;
