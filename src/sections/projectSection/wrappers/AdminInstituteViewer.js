import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Account, Admin } from "../../../utils/bulsupis_mw";
import { projectListTranslator } from "../../../utils/translators";
import InstituteViewer from "../pages/InstituteViewer";

function AdminInstituteViewer() {
  const { instituteId } = useParams();
  const [institute, setInstitute] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Admin.Institutes.get(instituteId)
      .then((res) => {
        let institute = res.data;
        console.log(institute)
        setInstitute({
          abbv: institute.abbv,
          instituteId: institute.id,
          institute: institute.institute,
          projectList: projectListTranslator(institute.project_list),
          priority: institute.project_list.map((project) => project.id),
        });
        Account.getInfo()
          .then((accountRes) => setUser(accountRes.data))
          .catch((err) => console.log(err.message));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <React.Fragment>
    {(!institute || !user) && <LoadingComponent />}
    {institute && user && <InstituteViewer institute={institute} user={user}/>}
    </React.Fragment>
  );
}

export default AdminInstituteViewer;
