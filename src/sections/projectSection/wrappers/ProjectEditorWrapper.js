import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import ProjectEditor from "../pages/ProjectEditor";
import { Projects } from "../../../utils/bulsupis_mw";
import ErrorComponent from "../../../shared/components/ErrorComponent";

function ProjectEditorWrapper({ isNew }) {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projectError, setProjectError] = useState(null);

  useEffect(() => {
    Projects.get(id)
      .then(({ simple, full }) => {
        if(simple) {
          setProject(simple.data);
        } else {
          setProject(simple);
          setProjectError(full);
        }
      })
      .catch((err) => {
        setProjectError(err.message);
      });
  }, []);

  return (
    <React.Fragment>
      {project == null && <LoadingComponent />}
      {projectError && <ErrorComponent message={projectError} />}
      {project && !projectError && <ProjectEditor isNew={isNew} project={project} />}
    </React.Fragment>
  );
}

export default ProjectEditorWrapper;
