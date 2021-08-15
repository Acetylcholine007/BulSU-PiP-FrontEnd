import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import ProjectEditor from "../pages/ProjectEditor";
import { serverUrl } from "../../../utils/serverUrl";

function ProjectEditorWrapper({ user }) {
  const { id } = useParams();
  const {
    error,
    isPending,
    data: project,
  } = useFetch(`${serverUrl}projects?id=${id}`);
  return (
    <React.Fragment>
      {error && <ErrorComponent message="Can't load project" />}
      {isPending && <LoadingComponent />}
      {project && <ProjectEditor isNew={false} user={user} project={project[0]} />}
    </React.Fragment>
  );
}

export default ProjectEditorWrapper;
