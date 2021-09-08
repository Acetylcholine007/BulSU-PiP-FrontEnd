import React, { useEffect, useState } from "react";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Admin } from "../../../utils/bulsupis_mw";
import InstitutePage from "../pages/InstitutePage";

function InstituteWrapper() {
  const [institutes, setInstitutes] = useState(null);
  const [instituteError, setInstituteError] = useState(null);

  useEffect(() => {
    Admin.Institutes.getAll()
      .then(({ simple, full }) => {
        if (simple) {
          setInstitutes(simple.data.slice(0, simple.data.length - 1));
        } else {
          setInstitutes(simple);
          setInstituteError(full);
        }
      })
      .catch((err) => {
        setInstituteError(err.message);
      });
  }, []);

  return (
    <React.Fragment>
      {institutes == null && <LoadingComponent />}
      {instituteError && <ErrorComponent message={instituteError} />}
      {institutes && !instituteError && (
        <InstitutePage institutes={institutes} />
      )}
    </React.Fragment>
  );
}

export default InstituteWrapper;
