import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ElevatedProjectViewer from "../pages/ElevatedProjectViewer";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Admin } from "../../../utils/bulsupis_mw";

function AdminProjectViewer() {
  const { instituteId, projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    Admin.Institutes.get(instituteId)
    .then((instituteRes) => {
      Admin.Projects.get(projectId)
        .then((res) => {
          console.log({
            ...res.data,
          })
          setProject({
            ...res.data,
            institute: instituteRes.data,
            priority: instituteRes.data.project_list.findIndex((item) => item.id === projectId) + 1,
            suc: 'Bulacan State University'
          });
        })
        .catch((err) => {
          console.log(err.message);
          setProject(null);
        });
    })
    .catch((err) => console.log(err.message))
  }, []);

  return (
    <React.Fragment>
      {!project && <LoadingComponent />}
      {project && (
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
