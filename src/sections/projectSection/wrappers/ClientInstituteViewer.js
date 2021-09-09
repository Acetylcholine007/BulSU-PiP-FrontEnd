import React, { useEffect, useState } from "react";
import ErrorComponent from "../../../shared/components/ErrorComponent";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Account, Projects } from "../../../utils/bulsupis_mw";
import { projectListTranslator } from "../../../utils/translators";
import InstituteViewer from "../pages/InstituteViewer";

function ClientInstituteViewer() {
  const [institute, setInstitute] = useState(null);
  const [user, setUser] = useState(null);
  const [projectError, setProjectError] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    Account.getInfo()
      .then(({ simple: accountSimple, full: accountFull }) => {
        if (accountSimple) {
          setUser(accountSimple.data);
          Projects.getInstitute(accountSimple.data.institute.id)
            .then(({ simple: projectSimple, full: projectFull }) => {
              if (projectSimple) {
                let institute = projectSimple.data;
                setInstitute({
                  abbv: institute.abbv,
                  instituteId: institute.id,
                  projectList: projectListTranslator(institute.project_list),
                  priority: institute.project_list.map((project) => project.id),
                });
              } else {
                setInstitute(projectSimple);
                setProjectError(projectFull);
              }
            })
            .catch((err) => setProjectError(err.message));
        } else {
          setUser(accountSimple);
          setUserError(accountFull);
        }
      })
      .catch((err) => setUserError(err.message));
  }, []);

  return (
    <React.Fragment>
      {(institute == null || user == null) && <LoadingComponent />}
      {(projectError || userError) && <ErrorComponent message={`${projectError}\n${userError}`} />}
      {institute && user && !(projectError || userError) && (
        <InstituteViewer institute={institute} user={user} />
      )}
    </React.Fragment>
  );
}

export default ClientInstituteViewer;
