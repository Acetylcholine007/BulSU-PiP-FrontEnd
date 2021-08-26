import React from "react";
import { useParams } from "react-router-dom";
import ElevatedProjectViewer from "../pages/ElevatedProjectViewer";

import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { serverUrl } from "../../../utils/serverUrl";

function AdminProjectViewer() {
  const { instituteId, projectId } = useParams();

  const {
    error,
    isPending,
    data: institute,
  } = useFetch(`${serverUrl}institutes?id=${instituteId}`);

  return (
    <React.Fragment>
      {error && <ErrorComponent message="Can't view project" />}
      {isPending && <LoadingComponent />}
      {institute && (
        <ElevatedProjectViewer
          instituteId={instituteId}
          project={institute[0].projects.find(
            (project) => project.id == parseInt(projectId)
          )}
          institute={institute[0]}
          projectId={parseInt(projectId)}
          priority={institute[0].priority}
        />
      )}
    </React.Fragment>
  );
}

export default AdminProjectViewer;
