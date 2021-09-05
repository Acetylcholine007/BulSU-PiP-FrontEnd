import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import ProjectEditor from "../pages/ProjectEditor";
import { Projects } from "../../../utils/bulsupis_mw";

function ProjectEditorWrapper({isNew}) {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    Projects.get(id)
    .then((res) => {
      console.log(res.data);
      setProject(res.data);
    })
    .catch((err) => {
      console.log(err.message);
    })
  }, [])

  return (
    <React.Fragment>
      {!project && <LoadingComponent />}
      {project && (
        isNew ? <ProjectEditor
          isNew={true}
          project={project}
        /> : 
        <ProjectEditor
          isNew={false}
          project={project}
        />
      )}
    </React.Fragment>
  );
}

export default ProjectEditorWrapper;
