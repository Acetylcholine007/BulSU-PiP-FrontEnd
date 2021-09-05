import React, { useEffect, useState } from "react";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Account, Projects } from "../../../utils/bulsupis_mw";
import { projectListTranslator } from "../../../utils/translators";
import InstituteViewer from "../pages/InstituteViewer";

function ClientInstituteViewer() {
  const [institute, setInstitute] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Account.getInfo()
    .then((accountRes) => {
      setUser(accountRes.data);
      Projects.getInstitute(accountRes.data.institute.id)
      .then((projectRes) => {
        let institute = projectRes.data;
        setInstitute({
          abbv: institute.abbv,
          instituteId: institute.id,
          projectList: projectListTranslator(institute.project_list),
          priority: institute.project_list.map((project) => project.id)
        });
      })
    })
    .catch((err) => console.log(err.message))
  }, []);

  return (
    <React.Fragment>
      {(!institute || !user) && <LoadingComponent />}
      {institute && user && <InstituteViewer institute={institute} user={user}/>}
    </React.Fragment>
  );
}

export default ClientInstituteViewer;
