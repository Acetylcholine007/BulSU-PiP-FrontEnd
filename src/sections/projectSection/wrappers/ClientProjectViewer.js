import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorComponent from "../../../shared/components/ErrorComponent";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Account, Projects } from "../../../utils/bulsupis_mw";
import ProjectViewer from "../pages/ProjectViewer";

function ClientProjectViewer() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [projectError, setProjectError] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    Account.getInfo()
      .then(({ simple: accountSimple, full: accountFull }) => {
        if (accountSimple) {
          Projects.get(id)
            .then(({ simple: projectSimple, full: projectFull }) => {
              if (projectSimple) {
                setProject({
                  ...projectSimple.data,
                  institute: accountSimple.data.institute,
                  priority:
                    accountSimple.data.projectList.findIndex(
                      (item) => item.id === id
                    ) + 1,
                  suc: "Bulacan State University",
                });
              } else {
                setProject(projectSimple);
                setProjectError(projectFull);
              }
            })
            .catch((err) => {
              setProjectError(err.message);
            });
        } else {
          setUserError(accountFull);
        }
      })
      .catch((err) => setUserError(err.message));
  }, []);

  return (
    <React.Fragment>
      {project == null && <LoadingComponent />}
      {(projectError || userError) && <ErrorComponent message={`${projectError}\n${userError}`} />}
      {project && !(projectError || userError) && <ProjectViewer project={project} />}
    </React.Fragment>
  );
}

export default ClientProjectViewer;
