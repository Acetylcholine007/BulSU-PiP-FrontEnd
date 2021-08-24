import React from "react";
import { useParams } from "react-router-dom";
import ElevatedProjectViewer from "../pages/ElevatedProjectViewer";

import { serverUrl } from "../../../utils/serverUrl";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";

function AdminProjectViewer() {
  const { instituteId, projectId } = useParams();
  const {
    error,
    isPending,
    data: project,
  } = useFetch(`${serverUrl}projects?id=${projectId}`);

  return (
    <React.Fragment>
      {error && <ErrorComponent message="Can't view project" />}
      {isPending && <LoadingComponent />}
      {project && (
        <ElevatedProjectViewer
          instituteId={instituteId}
          project={project[0]}
        />
      )}
    </React.Fragment>
  );
}

export default AdminProjectViewer;
