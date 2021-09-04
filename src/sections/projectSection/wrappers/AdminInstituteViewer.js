import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Admin } from "../../../utils/bulsupis_mw";
import { projectListTranslator } from "../../../utils/translators";
import InstituteViewer from "../pages/InstituteViewer";

function AdminInstituteViewer() {
  const { instituteId } = useParams();
  const [institute, setInstitute] = useState(null);
  
  useEffect(() => {
    Admin.Institutes.get(instituteId)
    .then((res) => {
      let institute = res.data
      setInstitute({
        abbv: institute.abbv,
        instituteId: institute.id,
        projectList: projectListTranslator(institute.project_list),
        priority: institute.project_list.map((project) => project.id)
      })
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  return (
    <React.Fragment>
      {!institute && <LoadingComponent />}
      {institute && (
        <InstituteViewer
          institute={institute}
        />
      )}
    </React.Fragment>
  );
}

export default AdminInstituteViewer;
