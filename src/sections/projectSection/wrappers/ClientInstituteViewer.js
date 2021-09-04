import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import useFetch from "../../../hooks/useFetch";
import ErrorComponent from "../../../shared/components/ErrorComponent";
import LoadingComponent from "../../../shared/components/LoadingComponent";
import { Projects } from "../../../utils/bulsupis_mw";
import { serverUrl } from "../../../utils/serverUrl";
import InstituteViewer from "../pages/InstituteViewer";

function ClientInstituteViewer() {
  const { user } = useContext(AuthContext);
  const [institute, setInstitute] = useState(null);

  useEffect(() => {
    console.log({
      abbv: user.institute.abbv,
      instituteId: user.institute.instituteId,
      projectList: user.projectList,
      priority: user.projectList.map((project) => project.id)
    })
    setInstitute({
      abbv: user.institute.abbv,
      instituteId: user.institute.instituteId,
      projectList: user.projectList,
      priority: user.projectList.map((project) => project.id)
    })
  }, []);

  return (
    <React.Fragment>
      {institute == null && <LoadingComponent />}
      {institute && (
        <InstituteViewer
          institute={institute}
        />
      )}
    </React.Fragment>
  );
}

export default ClientInstituteViewer;
