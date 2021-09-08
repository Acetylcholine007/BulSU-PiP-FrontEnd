import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorComponent from "../../../shared/components/ErrorComponent";

import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Account, Admin } from "../../../utils/bulsupis_mw";
import { projectListTranslator } from "../../../utils/translators";
import InstituteViewer from "../pages/InstituteViewer";

function AdminInstituteViewer() {
  const { instituteId } = useParams();
  const [institute, setInstitute] = useState(null);
  const [user, setUser] = useState(null);
  const [instituteError, setInstituteError] = useState(null);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    Admin.Institutes.get(instituteId)
      .then(({ simple: instSimple, full: instFull }) => {
        if(instSimple) {
          let institute = instSimple.data;
          setInstitute({
            abbv: institute.abbv,
            instituteId: institute.id,
            institute: institute.institute,
            projectList: projectListTranslator(institute.project_list),
            priority: institute.project_list.map((project) => project.id),
          });
          Account.getInfo()
            .then(({ simple: accountSimple, full: accountFull }) => {
              if(accountSimple) {
                setUser(accountSimple.data)
              } else {
                setUser(accountSimple)
                setUserError(accountFull);
              }
            })
            .catch((err) => setUserError(err.message));
        } else {
          setInstitute(instSimple);
          setInstituteError(instFull);
        }
      })
      .catch((err) => {
        setInstituteError(err.message);
      });
  }, []);

  return (
    <React.Fragment>
    {(institute == null || user == null) && <LoadingComponent />}
    {(instituteError || userError) && <ErrorComponent message={`${instituteError}\n${userError}`} />}
    {institute && user && !(instituteError || userError) && <InstituteViewer institute={institute} user={user}/>}
    </React.Fragment>
  );
}

export default AdminInstituteViewer;
