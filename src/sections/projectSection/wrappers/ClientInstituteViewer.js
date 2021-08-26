import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { serverUrl } from "../../../utils/serverUrl";
import InstituteViewer from "../pages/InstituteViewer";

function ClientInstituteViewer() {
  const { user } = useContext(AuthContext);

  const {
    error,
    isPending,
    data: institute,
  } = useFetch(`${serverUrl}institutes?id=${user.institute.abbv}`);

  return (
    <React.Fragment>
      {error && <ErrorComponent message="Failed to fetch projects" />}
      {isPending && <LoadingComponent />}
      {institute && (
        <InstituteViewer
          institute={institute}
          instituteId={user.institute.abbv}
        />
      )}
    </React.Fragment>
  );
}

export default ClientInstituteViewer;
