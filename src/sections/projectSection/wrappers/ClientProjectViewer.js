import React, { useContext } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { serverUrl } from "../../../utils/serverUrl";
import ProjectViewer from "../pages/ProjectViewer";

function ClientProjectViewer() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const {
    error,
    isPending,
    data: institute,
  } = useFetch(`${serverUrl}institutes?id=${user.institute.abbv}`);

  return (
    <React.Fragment>
      {error && <ErrorComponent message="Can't view project" />}
      {isPending && <LoadingComponent />}
      {institute && (
        <ProjectViewer
          project={institute[0].projects.find((project) => project.id == id)}
          priority={institute[0].priority}
          projectId={parseInt(id)}
          institute={institute[0]}
        />
      )}
    </React.Fragment>
  );
}

export default ClientProjectViewer;
