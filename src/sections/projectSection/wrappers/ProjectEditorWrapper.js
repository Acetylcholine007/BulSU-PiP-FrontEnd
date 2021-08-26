import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import ProjectEditor from "../pages/ProjectEditor";
import { serverUrl } from "../../../utils/serverUrl";
import { AuthContext } from "../../../contexts/AuthContext";

function ProjectEditorWrapper({isNew}) {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const {
    error,
    isPending,
    data: institute,
  } = useFetch(`${serverUrl}institutes?id=${user.institute.abbv}`);

  return (
    <React.Fragment>
      {error && <ErrorComponent message="Can't load project" />}
      {isPending && <LoadingComponent />}
      {institute && (
        isNew ? <ProjectEditor
          isNew={true}
          priority={institute[0].priority}
          institute={institute[0]}
        /> : 
        <ProjectEditor
          isNew={false}
          project={institute[0].projects.find((project) => project.id == parseInt(id))}
          priority={institute[0].priority}
          institute={institute[0]}
        />
      )}
    </React.Fragment>
  );
}

export default ProjectEditorWrapper;
