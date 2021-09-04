import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../../../contexts/AuthContext";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Projects } from "../../../utils/bulsupis_mw";
import ProjectViewer from "../pages/ProjectViewer";

function ClientProjectViewer() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState(null);

  useEffect(() => {
    Projects.get(id)
      .then((res) => {
        setProject({...res.data, institute: user.institute});
      })
      .catch((err) => {
        console.log(err.message);
        setProject(null);
      });
  }, []);

  return (
    <React.Fragment>
      {project == null && <LoadingComponent />}
      {project && (
        <ProjectViewer
          project={project}
          priority={user.projectList.indexOf(project) + 1}
        />
      )}
    </React.Fragment>
  );
}

export default ClientProjectViewer;
