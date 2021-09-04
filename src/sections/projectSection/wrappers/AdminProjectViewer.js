import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ElevatedProjectViewer from "../pages/ElevatedProjectViewer";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Admin, Projects } from "../../../utils/bulsupis_mw";
import { InstituteContext } from "../../../contexts/InstituteContext";
import { projectTranslator } from "../../../utils/translators";

function AdminProjectViewer() {
  const { instituteId, projectId } = useParams();
  const [project, setProject] = useState(null);
  const { institute } = useContext(InstituteContext);

  useEffect(() => {
    console.log(institute);
    Admin.Projects.get(projectId)
      .then((res) => {
        console.log({
          ...res.data,
        })
        setProject({
          ...res.data,
          institute: institute,
          proponentName: { surname: "", firstName: "", middleInitial: "" },
          implementationPeriod: {start: '', end: ''},
        });
      })
      .catch((err) => {
        console.log(err.message);
        setProject(null);
      });
  }, []);

  return (
    <React.Fragment>
      {!project && <LoadingComponent />}
      {project && (
        <ElevatedProjectViewer
          instituteId={instituteId}
          project={project}
          institute={institute}
          projectId={projectId}
          priority={1}
        />
      )}
    </React.Fragment>
  );
}

export default AdminProjectViewer;
