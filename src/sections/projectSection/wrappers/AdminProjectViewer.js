import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ElevatedProjectViewer from "../pages/ElevatedProjectViewer";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Admin } from "../../../utils/bulsupis_mw";
import ErrorComponent from "../../../shared/components/ErrorComponent";

function AdminProjectViewer() {
  const { instituteId, projectId } = useParams();
  const [project, setProject] = useState(null);
  const [projectError, setProjectError] = useState(null);
  const [instituteError, setInstituteError] = useState(null);

  useEffect(() => {
    Admin.Institutes.get(instituteId)
      .then(({ simple: instSimple, full: instFull }) => {
        if (instSimple) {
          Admin.Projects.get(projectId)
            .then(({ simple: projectSimple, full: projectFull }) => {
              if (projectSimple) {
                setProject({
                  ...projectSimple.data,
                  institute: instSimple.data,
                  priority:
                    instSimple.data.project_list.findIndex(
                      (item) => item.id === projectId
                    ) + 1,
                  proponentName: projectSimple.data.proponentName
                    ? projectSimple.data.proponentName
                    : {
                        surname: "No Surname",
                        firstName: "No First name",
                        middleInitial: "No Middle Initial",
                      },
                  suc: "Bulacan State University",
                });
              } else {
                setProject(projectSimple);
                setProjectError(projectFull);
              }
            })
            .catch((err) => setProjectError(err.message));
        } else {
          setInstituteError(instFull);
        }
      })
      .catch((err) => setInstituteError(err.message));
  }, []);

  return (
    <React.Fragment>
      {project == null && <LoadingComponent />}
      {(projectError || instituteError) && (
        <ErrorComponent message={`${projectError}\n${instituteError}`} />
      )}
      {project && !(projectError || instituteError) && (
        <ElevatedProjectViewer
          instituteId={instituteId}
          project={project}
          priority={1}
        />
      )}
    </React.Fragment>
  );
}

export default AdminProjectViewer;
