import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { serverUrl } from "../../../utils/serverUrl";
import InstituteViewer from "../pages/InstituteViewer";

function AdminInstituteViewer() {
  const { instituteId } = useParams();

  const {
    error,
    isPending,
    data: institute,
  } = useFetch(`${serverUrl}institutes?id=${instituteId}`);

  return (
    <React.Fragment>
      {error && <ErrorComponent message="Failed to fetch projects" />}
      {isPending && <LoadingComponent />}
      {institute && (
        <InstituteViewer institute={institute} instituteId={instituteId} />
      )}
    </React.Fragment>
  );
}

export default AdminInstituteViewer;
