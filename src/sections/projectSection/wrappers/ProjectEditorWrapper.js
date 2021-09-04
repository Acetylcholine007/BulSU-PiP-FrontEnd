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

  return (
    <React.Fragment>
      {false && <LoadingComponent />}
      {true && (
        isNew ? <ProjectEditor
          isNew={true}
          priority={1}
          institute={null}
        /> : 
        <ProjectEditor
          isNew={false}
          project={null}
          priority={1}
          institute={null}
        />
      )}
    </React.Fragment>
  );
}

export default ProjectEditorWrapper;
