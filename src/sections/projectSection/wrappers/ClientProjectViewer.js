import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Account, Projects } from "../../../utils/bulsupis_mw";
import ProjectViewer from "../pages/ProjectViewer";

function ClientProjectViewer() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    Account.getInfo()
      .then((accountRes) => {
        Projects.get(id)
          .then((res) => {
            console.log(res.data)
            setProject({
              ...res.data,
              institute: accountRes.data.institute,
              priority: accountRes.data.projectList.findIndex((item) => item.id === id) + 1,
              suc: 'Bulacan State University'
            });
          })
          .catch((err) => {
            console.log(err.message);
            setProject(null);
          });
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <React.Fragment>
      {project == null && <LoadingComponent />}
      {project && (
        <ProjectViewer
          project={project}
        />
      )}
    </React.Fragment>
  );
}

export default ClientProjectViewer;
